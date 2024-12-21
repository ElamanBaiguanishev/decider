import { IsString, IsInt, IsOptional, Length } from 'class-validator';
import { MapEntity } from 'src/maps/entities/map.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateDeciderDto {
    @IsString()
    @Length(1, 255)
    title: string;

    @IsString()
    description: string;

    @IsInt()
    creator: User;

    @IsOptional()
    maps?: MapEntity[];
}
