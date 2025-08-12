import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSnackDto } from './dto/createSnack.dto';
import { SnackService } from './snack.service';
import { PaginationDTO } from './dto/pagination.dto';
import { UpdateSnackDto } from './dto/updateSnackDto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('snack')
export class SnackController {
  constructor(private readonly snackService: SnackService) {}

  @Get()
  @HttpCode(200)
  async findAll(@Query() paginationDTO: PaginationDTO) {
    return await this.snackService.findAll(paginationDTO);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.snackService.findOne(id);
  }

  //과자 데이터 생성
  @Post()
  @UseInterceptors(FileInterceptor('snackImg'))
  async create(
    @UploadedFile() snackImg: Express.Multer.File,
    @Body() createSnackDto: CreateSnackDto,
  ) {
    console.log('===== 요청 들어옴 =====');
    console.log('BODY:', createSnackDto);
    console.log(
      'FILE:',
      snackImg?.originalname,
      snackImg?.mimetype,
      snackImg?.size,
    );

    // 파일 필수라면 여기서 검사 (DTO가 아니라 컨트롤러에서!)
    if (!snackImg) {
      throw new BadRequestException('이미지 파일(snackImg)은 필수입니다.');
    }
    if (!/^image\//.test(snackImg.mimetype)) {
      throw new BadRequestException('이미지 파일만 업로드 가능합니다.');
    }

    return await this.snackService.create(createSnackDto, snackImg);
  }

  //과자 수정
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSnackDto,
  ) {
    await this.snackService.update(id, body);
    return await this.snackService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.snackService.delete(id);
  }
}
