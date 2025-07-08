import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('snack')
export class SnackController {
  @Get()
  findAll() {
    return 'snack';
  }

  @Get(':id')
  fineOne(@Param('id', ParseIntPipe) id: number): number {
    return id;
  }

  //과자 데이터 생성
  @Post()
  create(@Body() body): any {
    return body;
  }

  //과자 수정
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any): any {
    return { id, ...body };
  }

  //과자 삭제
  @Post(':id')
  delete(@Param('id', ParseIntPipe) id: number): number {
    return id;
  }
}
