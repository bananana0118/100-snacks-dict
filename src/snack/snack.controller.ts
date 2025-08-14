import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateSnackDto } from './dto/createSnack.dto';
import { SnackService } from './snack.service';
import { PaginationDTO } from './dto/pagination.dto';
import { UpdateSnackDto } from './dto/updateSnackDto';

@Controller('snack')
export class SnackController {
  constructor(
    @Inject(SnackService)
    private readonly snackService: SnackService,
  ) {}

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
  // @UseInterceptors(FileInterceptor('snackImg'))
  async create(@Body() createSnackDto: CreateSnackDto) {
    // 파일 필수라면 여기서 검사 (DTO가 아니라 컨트롤러에서!)
    if (!createSnackDto.snackImg) {
      throw new BadRequestException('이미지 파일(snackImg)은 필수입니다.');
    }

    return await this.snackService.create(createSnackDto);
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
