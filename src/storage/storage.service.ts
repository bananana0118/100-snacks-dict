import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
@Injectable()
export class StorageService {
  private s3 = new S3Client({ region: process.env.SERVER_AWS_REGION });

  async getPresignedPutUrl(
    fileName: string,
    fileType: string,
  ): Promise<{ url: string; key: string; expiresIn: number }> {
    const safe = fileName.replace(/[^\w.-]/g, '_');

    // (선택) MIME 화이트리스트
    const ALLOWED = new Set([
      'image/png',
      'image/jpeg',
      'image/webp',
      'image/gif',
      // 필요 시 추가
    ]);

    if (!ALLOWED.has(fileType)) {
      throw new Error(`Unsupported content type: ${fileType}`);
    }

    const key = `snacks/${Date.now()}_${Math.random().toString(36).slice(2)}_${safe}`;
    const cmd = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: fileType,
    });

    const url = await getSignedUrl(this.s3, cmd, {
      expiresIn: 300, //300초
    });
    return { url, key, expiresIn: 300 };
  }
}
