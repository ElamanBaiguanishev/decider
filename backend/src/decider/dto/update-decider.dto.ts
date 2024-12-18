import { PartialType } from '@nestjs/mapped-types';
import { CreateDeciderDto } from './create-decider.dto';

export class UpdateDeciderDto extends PartialType(CreateDeciderDto) {}
