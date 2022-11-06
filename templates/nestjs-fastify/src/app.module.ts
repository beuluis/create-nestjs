import type { DynamicModule, ModuleMetadata } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatModule } from './modules/cat.module';
import { OrmConfigService } from './orm-config/orm-config.service';

@Module({})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {
    public static register(typeOrmModule?: DynamicModule) {
        const imports: ModuleMetadata['imports'] = [
            ConfigModule.forRoot({
                ignoreEnvFile: true,
                isGlobal: true,
            }),
            ...(typeOrmModule
                ? [typeOrmModule]
                : [
                      TypeOrmModule.forRootAsync({
                          useClass: OrmConfigService,
                          inject: [OrmConfigService],
                      }),
                  ]),
            CatModule,
        ];
        return {
            module: AppModule,
            imports,
        };
    }
}
