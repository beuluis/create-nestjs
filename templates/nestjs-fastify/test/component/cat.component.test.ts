import type { INestApplication } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { bootstrapTestApplication } from '../helpers/bootstrap-test-application';

describe('Challenge', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await bootstrapTestApplication();
    });

    describe('/api/v1/cat/create', () => {
        it('should create new cat', async () => {
            expect.assertions(6);
            await request(app.getHttpServer())
                .post('/api/v1/cat/create')
                .send({ name: 'Luna' })
                .expect(response => {
                    expect(response.status).toEqual(HttpStatus.CREATED);
                    // Check object shape and make sure we are not returning something that we want to hide
                    expect(response.body).toHaveProperty('id');
                    delete response.body.id;
                    expect(response.body).toHaveProperty('name');
                    delete response.body.name;
                    expect(response.body).toHaveProperty('createdAt');
                    delete response.body.createdAt;
                    expect(response.body).toHaveProperty('updatedAt');
                    delete response.body.updatedAt;

                    expect(response.body).toEqual({});
                });
        });

        it('should throw BadRequestException if name is not provided', async () => {
            expect.assertions(2);
            await request(app.getHttpServer())
                .get('/api/v1/cat/create')
                .expect(response => {
                    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
                    expect(response.body).toEqual({
                        statusCode: 400,
                        message: 'Validation failed (uuid v 4 is expected)',
                        error: 'Bad Request',
                    });
                });
        });
    });

    describe('/api/v1/cat/:id', () => {
        it('should return cat by id', async () => {
            expect.assertions(6);
            const { body: currentCat } = await request(app.getHttpServer())
                .post('/api/v1/cat/create')
                .send({ name: 'Milo' });

            await request(app.getHttpServer())
                .get(`/api/v1/cat/${currentCat.id}`)
                .expect(response => {
                    expect(response.status).toEqual(HttpStatus.OK);
                    // Check object shape and make sure we are not returning something that we want to hide
                    expect(response.body).toHaveProperty('id');
                    delete response.body.id;
                    expect(response.body).toHaveProperty('name');
                    delete response.body.name;
                    expect(response.body).toHaveProperty('createdAt');
                    delete response.body.createdAt;
                    expect(response.body).toHaveProperty('updatedAt');
                    delete response.body.updatedAt;

                    expect(response.body).toEqual({});
                });
        });

        it('should throw NotFoundException if id does not exist', async () => {
            expect.assertions(2);
            await request(app.getHttpServer())
                .get('/api/v1/cat/eef17a88-f659-439b-9f02-59c6d39c789d')
                .expect(response => {
                    expect(response.status).toEqual(HttpStatus.NOT_FOUND);
                    expect(response.body).toEqual({
                        statusCode: 404,
                        message:
                            'Could not find any entity of type "Cat" matching: {\n    "id": "eef17a88-f659-439b-9f02-59c6d39c789d"\n}',
                        error: 'Not Found',
                    });
                });
        });

        it('should throw BadRequestException if id is not uuid v4', async () => {
            expect.assertions(2);
            await request(app.getHttpServer())
                .get('/api/v1/cat/notuuid')
                .expect(response => {
                    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
                    expect(response.body).toEqual({
                        statusCode: 400,
                        message: 'Validation failed (uuid v 4 is expected)',
                        error: 'Bad Request',
                    });
                });
        });
    });
});
