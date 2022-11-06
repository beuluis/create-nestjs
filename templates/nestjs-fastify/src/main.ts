import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { configureApp } from './app';
import { AppModule } from './app.module';

const bootstrap = async () => {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule.register(),
        new FastifyAdapter({ logger: true }),
    );

    configureApp(app);

    await app.listen(80, '0.0.0.0');
};

void bootstrap();
