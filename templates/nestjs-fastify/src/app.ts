import { ValidationPipe } from '@nestjs/common';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version, name, description } from '../package.json';
import { validationPipeConfig } from './validation/validation-pipe.config';

export const configureApp = (app: NestFastifyApplication) => {
    app.useGlobalPipes(new ValidationPipe(validationPipeConfig));

    const config = new DocumentBuilder()
        .setTitle(name)
        .setDescription(description)
        .setVersion(version)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1', app, document);
};
