import { Snack } from 'src/entities/snack.entity';
import { CreateSnackDto } from './dto/createSnack.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDTO } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/DEFAULT_PAGE_SIZE';
import { UpdateSnackDto } from './dto/updateSnackDto';
import { SnackResponseDto } from './dto/snackResponse.dto';
@Injectable()
export class SnackService {
  constructor(@InjectRepository(Snack) private snackRepo: Repository<Snack>) {}

  async create(createSnackDto: CreateSnackDto) {
    const snack = this.snackRepo.create(createSnackDto);
    return await this.snackRepo.save(snack);
  }

  async findAll(paginationDTO: PaginationDTO): Promise<SnackResponseDto[]> {
    const pageSize = paginationDTO.size ?? DEFAULT_PAGE_SIZE;
    const page = paginationDTO.page ?? 1;

    const snacks = await this.snackRepo.find({
      relations: ['snackType', 'brand'],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return snacks.map(
      (snack): SnackResponseDto => ({
        id: snack.id,
        name: snack.name,
        snackTypeCode: snack.snackType.code,
        brandCode: snack.brand.code,
        tasteCodes: snack.tastes.map((taste) => taste.code),
        storeCodes: snack.stores.map((store) => store.code),
        price: snack.price,
        snackImg: snack.snackImg,
        kcal: snack.kcal,
        capacity: snack.capacity,
        releaseAt: snack.releaseAt,
      }),
    );
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
