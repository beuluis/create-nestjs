import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CatRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Neo',
    })
    public name: string;
}
