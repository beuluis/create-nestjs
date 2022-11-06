import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { EntityNotFoundError } from 'typeorm';
import { CatController } from '../../../src/controllers/cat.controller';
import { Cat } from '../../../src/entities/cat.entity';
import { CatService } from '../../../src/services/cat.service';

describe('CatController', () => {
    let catController: CatController;
    const catServiceMock = mock<CatService>();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [CatController],
            providers: [
                {
                    provide: CatService,
                    useValue: catServiceMock,
                },
            ],
        }).compile();

        catController = module.get<CatController>(CatController);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('postNewCat', () => {
        it('should call createNewCat method from cat service', async () => {
            expect.assertions(1);
            catServiceMock.createNewCat.mockResolvedValue(new Cat('testi'));

            await catController.postNewCat({ name: 'testi' });

            expect(catServiceMock.createNewCat).toHaveBeenCalledWith('testi');
        });

        it('should throw InternalServerErrorException', async () => {
            expect.assertions(2);
            catServiceMock.createNewCat.mockRejectedValue(new Error('test'));

            await expect(catController.postNewCat({ name: 'testi' })).rejects.toThrow(
                InternalServerErrorException,
            );

            expect(catServiceMock.createNewCat).toHaveBeenCalledWith('testi');
        });
    });

    describe('getCatById', () => {
        it('should call getCatById method from cat service', async () => {
            expect.assertions(1);
            catServiceMock.getCatById.mockResolvedValue(new Cat('testi'));

            await catController.getCatById('5568e476-3431-4f29-bfd6-fca460d0c971');

            expect(catServiceMock.getCatById).toHaveBeenCalledWith(
                '5568e476-3431-4f29-bfd6-fca460d0c971',
            );
        });

        it('should throw NotFoundException', async () => {
            expect.assertions(2);
            catServiceMock.getCatById.mockRejectedValue(
                new EntityNotFoundError(Cat, {
                    token: '5568e476-3431-4f29-bfd6-fca460d0c971',
                }),
            );

            await expect(
                catController.getCatById('5568e476-3431-4f29-bfd6-fca460d0c971'),
            ).rejects.toThrow(NotFoundException);

            expect(catServiceMock.getCatById).toHaveBeenCalledWith(
                '5568e476-3431-4f29-bfd6-fca460d0c971',
            );
        });

        it('should throw InternalServerErrorException', async () => {
            expect.assertions(2);
            catServiceMock.getCatById.mockRejectedValue(new Error('test'));

            await expect(
                catController.getCatById('5568e476-3431-4f29-bfd6-fca460d0c971'),
            ).rejects.toThrow(InternalServerErrorException);

            expect(catServiceMock.getCatById).toHaveBeenCalledWith(
                '5568e476-3431-4f29-bfd6-fca460d0c971',
            );
        });
    });
});
