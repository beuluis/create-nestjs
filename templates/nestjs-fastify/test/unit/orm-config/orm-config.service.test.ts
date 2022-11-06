import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { Cat } from '../../../src/entities/cat.entity';
import { OrmConfigService } from '../../../src/orm-config/orm-config.service';

describe('PermissionService', () => {
    let ormConfigService: OrmConfigService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [OrmConfigService],
        }).compile();

        ormConfigService = module.get(OrmConfigService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('createTypeOrmOptions', () => {
        it('should create TypeOrm config', async () => {
            expect.assertions(1);
            process.env.POSTGRES_HOST = 'postgres';
            process.env.POSTGRES_USER = 'user';
            process.env.POSTGRES_PASSWORD = 'pass';
            process.env.POSTGRES_DB = 'db';

            const result = ormConfigService.createTypeOrmOptions();

            expect(result).toEqual({
                type: 'postgres',
                host: 'postgres',
                username: 'user',
                password: 'pass',
                database: 'db',
                synchronize: true,
                entities: [Cat],
            });
        });
    });
});
