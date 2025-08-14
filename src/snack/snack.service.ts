import { Snack } from 'src/entities/snack.entity';
import { CreateSnackDto } from './dto/createSnack.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDTO } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/DEFAULT_PAGE_SIZE';
import { UpdateSnackDto } from './dto/updateSnackDto';
import {
  CreateSnackResponseDto,
  GetSnackResponseDto,
} from './dto/response/snackResponse.dto';
import { Brand } from 'src/entities/brand.entity';
import { SnackType } from 'src/entities/snack-type.entity';
import { Store } from 'src/entities/store.entity';
import { Taste } from 'src/entities/taste.entity';

@Injectable()
export class SnackService {
  constructor(
    @InjectRepository(Snack) private snackRepo: Repository<Snack>,
    @InjectRepository(SnackType)
    private snackTypeRepo: Repository<SnackType>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Taste) private tasteRepo: Repository<Taste>,
    @InjectRepository(Store) private storeRepo: Repository<Store>,
  ) {
    console.log('[DI]', {
      snackRepo: !!this.snackRepo,
      snackTypeRepo: !!this.snackTypeRepo,
      brandRepo: !!this.brandRepo,
      tasteRepo: !!this.tasteRepo,
      storeRepo: !!this.storeRepo,
    });
  }

  async create(dto: CreateSnackDto): Promise<CreateSnackResponseDto> {
    const snackType = await this.snackTypeRepo.findOneByOrFail({
      code: dto.snackTypeCode,
    });
    const brand = await this.brandRepo.findOneByOrFail({ code: dto.brandCode });
    const tastes = dto.tasteCodes?.length
      ? await this.tasteRepo.findBy({
          code: In(dto.tasteCodes.map((code) => code)),
        })
      : [];

    const stores = dto.storeCodes?.length
      ? await this.storeRepo.findBy({
          code: In(dto.storeCodes.map((code) => code)),
        })
      : [];

    const entity = this.snackRepo.create({
      snackType,
      name: dto.name,
      price: dto.price,
      kcal: dto.kcal,
      capacity: dto.capacity,
      releaseAt: dto.releaseAt,
      snackImg: dto.snackImg, // 이미지 URL은 클라이언트에서 제공
      brand,
      tastes,
      stores,
    });

    await this.snackRepo.save(entity);
    return {
      ...entity,
      tasteCodes: tastes.map((taste) => taste.code),
      storeCodes: stores.map((store) => store.code),
      brandCode: brand.code,
      snackTypeCode: snackType.code,
    };
  }

  async findAll(paginationDTO: PaginationDTO): Promise<GetSnackResponseDto[]> {
    const pageSize = paginationDTO.size ?? DEFAULT_PAGE_SIZE;
    const page = paginationDTO.page ?? 1;

    const snacks = await this.snackRepo.find({
      relations: ['snackType', 'brand'],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return snacks.map(
      (snack): GetSnackResponseDto => ({
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

  async findOne(id: number): Promise<GetSnackResponseDto> {
    const snack = await this.snackRepo.findOne({
      relations: ['snackType', 'brand'],
      where: { id },
    });

    if (!snack) throw new NotFoundException();
    return {
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
    };
  }

  async update(id: number, dto: UpdateSnackDto) {
    return await this.snackRepo.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.snackRepo.softDelete({ id });
  }
}
