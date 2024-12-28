import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Decider } from './entities/decider.entity';
import { CreateDeciderDto } from './dto/create-decider.dto';
import { UpdateDeciderDto } from './dto/update-decider.dto';
import { MapEntity } from 'src/maps/entities/map.entity';

@Injectable()
export class DeciderService {
    constructor(
        @InjectRepository(Decider)
        private readonly deciderRepository: Repository<Decider>,
        @InjectRepository(MapEntity)
        private readonly mapRepository: Repository<MapEntity>,
    ) { }

    async create(createDeciderDto: CreateDeciderDto) {
        const mapIds = createDeciderDto.maps ? createDeciderDto.maps.map(map => map.id) : [];

        const { maps, ...deciderData } = createDeciderDto;
        const decider = this.deciderRepository.create(deciderData);

        if (mapIds.length > 0) {
            const maps = await this.mapRepository.findBy({
                id: In(mapIds),
            });

            decider.maps = maps;
        }

        return await this.deciderRepository.save(decider);
    }


    async findAll(): Promise<Decider[]> {
        return await this.deciderRepository.find({ relations: ['maps'] });
    }

    async findOne(id: number): Promise<Decider> {
        return await this.deciderRepository.findOne({
            where: { id },
            relations: ['maps', 'creator'],
        });
    }

    async update(id: number, updateDeciderDto: UpdateDeciderDto) {
        // const { mapIds, ...updateData } = updateDeciderDto;
        // const decider = await this.findOne(id);

        // if (!decider) {
        //     throw new Error(`Decider with ID ${id} not found`);
        // }

        // Object.assign(decider, updateData);

        // if (mapIds && mapIds.length > 0) {
        //     const maps = await this.mapRepository.findByIds(mapIds);
        //     decider.maps = maps;
        // }

        // return await this.deciderRepository.save(decider);
    }

    async remove(id: number): Promise<void> {
        const result = await this.deciderRepository.delete(id);
        if (!result.affected) {
            throw new Error(`Decider with ID ${id} not found`);
        }
    }
}
