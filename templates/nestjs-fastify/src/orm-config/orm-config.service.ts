import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Cat } from '../entities/cat.entity';

@Injectable()
export class OrmConfigService implements TypeOrmOptionsFactory {
    public constructor(private readonly configService: ConfigService) {}

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('POSTGRES_HOST'),
            username: this.configService.get<string>('POSTGRES_USER'),
            password: this.configService.get<string>('POSTGRES_PASSWORD'),
            database: this.configService.get<string>('POSTGRES_DB'),
            synchronize: true,
            entities: [Cat],
        };
    }
}
