import { writeFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { version, name, description } from '../package.json';
import { AppModule } from '../src/app.module';

const writeSwaggerDocumentation = async () => {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule.register(
            TypeOrmModule.forRoot({
                type: 'sqlite',
                database: ':memory:',
            }),
        ),
        new FastifyAdapter({ logger: true }),
    );

    const config = new DocumentBuilder()
        .setTitle(name)
        .setDescription(description)
        .setVersion(version)
        .build();

    const document = SwaggerModule.createDocument(app, config);

    const promisifiedWriteFile = promisify(writeFile);
    await promisifiedWriteFile(join(__dirname, 'swagger.json'), JSON.stringify(document, null, 4));
    await app.close();
};

void writeSwaggerDocumentation();
