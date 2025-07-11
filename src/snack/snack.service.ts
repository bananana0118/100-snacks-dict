import { Snack } from 'src/entities/snack.entity';
import { CreateSnackDto } from './dto/createSnack.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDTO } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/DEFAULT_PAGE_SIZE';
import { UpdateSnackDto } from './dto/updateSnackDto';
@Injectable()
export class SnackService {
  constructor(@InjectRepository(Snack) private snackRepo: Repository<Snack>) {}

  async create(createSnackDto: CreateSnackDto) {
    const snack = this.snackRepo.create(createSnackDto);
    return await this.snackRepo.save(snack);
  }

  async findAll(paginationDTO: PaginationDTO) {
    return await this.snackRepo.find({
      skip: paginationDTO.skip,
      take: paginationDTO.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async findOne(id: number) {
    const snack = await this.snackRepo.findOne({ where: { id } });

    if (!snack) throw new NotFoundException();
    return snack;
  }

  async update(id: number, dto: UpdateSnackDto) {
    return await this.snackRepo.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.snackRepo.softDelete({ id });
  }
}
