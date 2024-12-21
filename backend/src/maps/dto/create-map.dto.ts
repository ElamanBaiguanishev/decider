import { IsString, IsInt, Length } from 'class-validator';

export class CreateMapDto {
    @IsString()
    @Length(1, 255)
    name: string;

    @IsString()
    @Length(1, 500)
    map_mode: string;

    @IsString()
    @Length(1, 500)
    icon_path: string;

    @IsString()
    description: string;

    @IsString()
    @Length(1, 100)
    author: string;

    @IsInt()
    order: number;
}
