import type { ValidationPipeOptions } from '@nestjs/common';

export const validationPipeConfig: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
};
