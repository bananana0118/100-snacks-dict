import { Snack } from 'src/entities/snack.entity';
import { CreateSnackDto } from './dto/createSnack.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDTO } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/DEFAULT_PAGE_SIZE';
import { UpdateSnackDto } from './dto/updateSnackDto';
import {
  CreateSnackResponseDto,
  GetSnackResponseDto,
} from './dto/response/snackResponse.dto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Brand } from 'src/entities/brand.entity';
import { SnackType } from 'src/entities/snack-type.entity';
import { Store } from 'src/entities/store.entity';
import { Taste } from 'src/entities/taste.entity';

@Injectable()
export class SnackService {
  private readonly s3 = new S3Client({ region: process.env.AWS_REGION });

  constructor(
    @InjectRepository(Snack) private snackRepo: Repository<Snack>,
    @InjectRepository(SnackType) private snackTypeRepo: Repository<SnackType>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Taste) private tasteRepo: Repository<Taste>,
    @InjectRepository(Store) private storeRepo: Repository<Store>,
  ) {}

  async create(
    dto: CreateSnackDto,
    file?: Express.Multer.File,
  ): Promise<CreateSnackResponseDto> {
    const snackType = await this.snackTypeRepo.findOneByOrFail({
      code: dto.snackTypeCode,
    });
    const brand = await this.brandRepo.findOneByOrFail({ code: dto.brandCode });
    const tastes = dto.tasteCodes?.length
      ? await this.tasteRepo.findBy({ code: In(dto.tasteCodes) })
      : [];

    const stores = dto.storeCodes?.length
      ? await this.storeRepo.findBy({ code: In(dto.storeCodes) })
      : [];

    let imageUrl: string | null = null;

    if (file) {
      const Bucket = process.env.AWS_S3_BUCKET_NAME;
      const prefix = process.env.AWS_S3_PREFIX ?? 'snack/';
      const ext = file.originalname.split('.').pop() || 'bin';
      const Key = `${prefix}${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

      await this.s3.send(
        new PutObjectCommand({
          Bucket,
          Key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      imageUrl = `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`;
    }
    const entity = this.snackRepo.create({
      name: dto.name,
      price: dto.price,
      kcal: dto.kcal,
      capacity: dto.capacity,
      releaseAt: dto.releaseAt,
      snackImg: imageUrl ?? null,
      snackType,
      brand,
      tastes,
      stores,
    });

    await this.snackRepo.save(entity);
    return { ...dto, snackTypeCode: snackType.code, snackImg: imageUrl };
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
