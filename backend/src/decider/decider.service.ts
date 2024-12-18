import { Injectable } from '@nestjs/common';
import { CreateDeciderDto } from './dto/create-decider.dto';
import { UpdateDeciderDto } from './dto/update-decider.dto';

@Injectable()
export class DeciderService {
  create(createDeciderDto: CreateDeciderDto) {
    return 'This action adds a new decider';
  }

  findAll() {
    return `This action returns all decider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} decider`;
  }

  update(id: number, updateDeciderDto: UpdateDeciderDto) {
    return `This action updates a #${id} decider`;
  }

  remove(id: number) {
    return `This action removes a #${id} decider`;
  }
}
