import { applyDecorators, Controller } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';

export const BaseController = (path: string, ...tags: string[]) =>
    applyDecorators(Controller(path), ApiInternalServerErrorResponse(), ApiTags(...tags));
