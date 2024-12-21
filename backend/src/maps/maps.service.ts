import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapEntity } from './entities/map.entity';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';

@Injectable()
export class MapsService {
  constructor(
    @InjectRepository(MapEntity)
    private readonly mapsRepository: Repository<MapEntity>,
  ) { }

  async create(createMapDto: CreateMapDto): Promise<MapEntity> {
    const map = this.mapsRepository.create(createMapDto);
    return await this.mapsRepository.save(map);
  }

  async findAll(): Promise<MapEntity[]> {
    return await this.mapsRepository.find({ relations: ['deciders', 'uploader'] });
  }

  async findOne(id: number): Promise<MapEntity> {
    return await this.mapsRepository.findOne({
      where: { id },
      relations: ['deciders'],
    });
  }

  async update(id: number, updateMapDto: UpdateMapDto): Promise<MapEntity> {
    await this.mapsRepository.update(id, updateMapDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.mapsRepository.delete(id);
  }
}
