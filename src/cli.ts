#!/usr/bin/env node

import { resolve } from 'path';
import { create } from '@beuluis/create-helper';

void create({
    templatesDirectory: resolve(__dirname, '..', 'templates'),
    defaultTemplate: 'fastify',
    templatesPrefix: 'nestjs-',
    setupInteractiveUI: (engine, buildInQuestions) => {
        engine.registerQuestions([
            buildInQuestions.name,
            buildInQuestions.description,
            buildInQuestions.license,
        ]);
    },
    afterCreationHook: async ({ getAfterHookHelper }) => {
        const helper = getAfterHookHelper();

        await helper.initGit();
        await helper.installDependencies();
    },
});
