import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatController } from '../controllers/cat.controller';
import { Cat } from '../entities/cat.entity';
import { CatService } from '../services/cat.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cat])],
    providers: [CatService],
    controllers: [CatController],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CatModule {}
