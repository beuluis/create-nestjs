import {
    Body,
    ClassSerializerInterceptor,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
import { EntityNotFoundError } from 'typeorm';
import { BaseController } from '../decorators/base-controller.decorator';
import { CatRequestDto } from '../dtos/post-cat-request.dto';
import { Cat } from '../entities/cat.entity';
import { CatService } from '../services/cat.service';

@BaseController('api/v1/cat', 'Animals')
export class CatController {
    public constructor(private readonly catService: CatService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Gets a cat by id' })
    @ApiResponse({
        status: 200,
        type: Cat,
    })
    @ApiBadRequestResponse()
    @ApiNotFoundResponse()
    @UseInterceptors(ClassSerializerInterceptor)
    public async getCatById(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    ): Promise<Cat> {
        try {
            return await this.catService.getCatById(id);
        } catch (error: unknown) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException(error.message);
            }

            throw new InternalServerErrorException();
        }
    }

    @Post('create')
    @ApiOperation({ summary: 'Creates a new cat' })
    @ApiCreatedResponse({
        description: 'A new cat was successfully created',
        type: Cat,
    })
    @ApiBadRequestResponse()
    @UseInterceptors(ClassSerializerInterceptor)
    public async postNewCat(@Body() catRequestDto: CatRequestDto): Promise<Cat> {
        try {
            return await this.catService.createNewCat(catRequestDto.name);
        } catch {
            throw new InternalServerErrorException();
        }
    }
}
