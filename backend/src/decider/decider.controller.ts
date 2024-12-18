import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeciderService } from './decider.service';
import { CreateDeciderDto } from './dto/create-decider.dto';
import { UpdateDeciderDto } from './dto/update-decider.dto';

@Controller('decider')
export class DeciderController {
  constructor(private readonly deciderService: DeciderService) {}

  @Post()
  create(@Body() createDeciderDto: CreateDeciderDto) {
    return this.deciderService.create(createDeciderDto);
  }

  @Get()
  findAll() {
    return this.deciderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deciderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeciderDto: UpdateDeciderDto) {
    return this.deciderService.update(+id, updateDeciderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deciderService.remove(+id);
  }
}
