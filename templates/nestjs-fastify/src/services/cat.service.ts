import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Cat } from '../entities/cat.entity';

@Injectable()
export class CatService {
    public constructor(
        @InjectRepository(Cat)
        private readonly catRepository: Repository<Cat>,
    ) {}

    public async createNewCat(name: string): Promise<Cat> {
        return await this.catRepository.save(new Cat(name));
    }

    public async getCatById(id: string): Promise<Cat> {
        const cat = await this.catRepository.findOneBy({ id });

        if (!cat) {
            throw new EntityNotFoundError(Cat, { id });
        }

        return cat;
    }
}
