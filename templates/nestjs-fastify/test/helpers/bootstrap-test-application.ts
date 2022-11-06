import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import type { TestingModuleBuilder } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configureApp } from '../../src/app';
import { AppModule } from '../../src/app.module';
import { Cat } from '../../src/entities/cat.entity';
import { SilenceLogger } from './silence.logger';

export const bootstrapTestApplication = async (
    override?: (testingModuleBuilder: TestingModuleBuilder) => Promise<void>,
): Promise<NestFastifyApplication> => {
    const testingModuleBuilder = Test.createTestingModule({
        imports: [
            AppModule.register(
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    username: 'test',
                    password: 'test',
                    database: 'test',
                    synchronize: true,
                    entities: [Cat],
                }),
            ),
        ],
    });

    if (override) await override(testingModuleBuilder);

    const testingModule = await testingModuleBuilder.compile();

    const app = testingModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter(), {
        logger: new SilenceLogger(),
    });

    configureApp(app);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    return app;
};
