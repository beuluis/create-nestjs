import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import type { Repository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm';
import { Cat } from '../../../src/entities/cat.entity';
import { CatService } from '../../../src/services/cat.service';

const catMock = new Cat('testi');
catMock.id = '5568e476-3431-4f29-bfd6-fca460d0c971';
catMock.createdAt = new Date();
catMock.updatedAt = new Date();

describe('ChallengeService', () => {
    let catService: CatService;
    const catRepository = mock<Repository<Cat>>();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CatService,
                {
                    provide: getRepositoryToken(Cat),
                    useValue: catRepository,
                },
            ],
        }).compile();

        catService = module.get(CatService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('createNewCat', () => {
        it('should create a new cat', async () => {
            expect.assertions(2);
            catRepository.save.mockResolvedValue(catMock);

            const result = await catService.createNewCat('testi');
            expect(catRepository.save).toHaveBeenCalledWith(new Cat('testi'));
            expect(result).toEqual(catMock);
        });
    });

    describe('getCatById', () => {
        it('should return a cat by id', async () => {
            expect.assertions(2);
            catRepository.findOneBy.mockResolvedValue(catMock);

            const result = await catService.getCatById('520eefcb7-71aa-4782-a25b-913aa7cd02ef');
            expect(catRepository.findOneBy).toHaveBeenCalledWith({
                id: '520eefcb7-71aa-4782-a25b-913aa7cd02ef',
            });
            expect(result).toEqual(catMock);
        });

        it('should throw EntityNotFoundError if cat not found', async () => {
            expect.assertions(1);
            catRepository.findOneBy.mockResolvedValue(undefined);

            await expect(
                catService.getCatById('520eefcb7-71aa-4782-a25b-913aa7cd02ef'),
            ).rejects.toThrow(EntityNotFoundError);
        });
    });
});
