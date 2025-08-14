import 'reflect-metadata';
import serverlessExpress from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { Context, Handler } from 'aws-lambda';

console.log('[BOOT] module loaded'); // ✅ 모듈 로드 확인

type CreateHandler = (param: { app: express.Express }) => Handler;

// serverlessExpress가 any처럼 보여서 no-unsafe-call에 걸리므로,
// 딱 한 번만 안전하게 타입 단언해서 함수 시그니처를 고정한다.

const createHandler = serverlessExpress as unknown as CreateHandler;

// serverlessExpress()가 반환하는 건 AWS Lambda 핸들러
let cachedHandler: Handler | null = null;

async function bootstrap(): Promise<Handler> {
  const app = express();

  console.log('[BOOT] Nest ready');
  const nest = await NestFactory.create(AppModule, new ExpressAdapter(app), {
    logger: ['log', 'error', 'warn', 'debug'],
  });
  nest.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await nest.init();
  let initHandler: Handler | null = null;

  // serverlessExpress를 사용하여 Express 앱을 AWS Lambda 핸들러로 변환
  // 이 부분에서 에러가 발생할 수 있으므로 try-catch로 감싸서 처리
  try {
    initHandler = createHandler({ app });
    return initHandler;
  } catch (error) {
    console.error('[ERR] top-level', error);

    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error during serverlessExpress initialization:', msg);
    throw error;
  }
}

export const handler: Handler = async (
  event,
  context: Context,
): Promise<Handler> => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    cachedHandler = cachedHandler ?? (await bootstrap());
    return await cachedHandler(event, context, () => void 0);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Lambda top-level error:', msg);
    throw e;
  }
};
