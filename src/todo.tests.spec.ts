import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

// @ts-ignore
import { Repository } from 'typeorm';
// @ts-ignore
import { TodoModule } from './todo/todo.module';
// @ts-ignore
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
// @ts-ignore
import { TodoEntity } from './todo/todo.entity/todo.entity';
// @ts-ignore
import { TodoController } from './todo/todo.controller';

describe('Todo Controller Test', () => {
    let app: INestApplication;
    let controller: TodoController;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot({
                type: 'better-sqlite3',
                database: ':memory:',
                dropSchema: true,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),TodoModule],   
            providers: [
                {
                    provide: getRepositoryToken(TodoEntity),
                    useValue: {
                        find: jest.fn()
                    },
                },
            ]
        }).compile();
        // @ts-ignore
        controller = new TodoController(module.get<Repository<TodoEntity>>(getRepositoryToken(TodoEntity)));
        app = module.createNestApplication();
        await app.init();
    });

    describe("Todo Routes Test" , () => {
        it('GET /todo correctly' , () => {
            return request(app.getHttpServer())
            .get('/todo')
            .expect(200)
            .expect(function(res){
                expect(res.body == controller.findAll())
            })
        })
        it('POST /todo correctly' , () => {
            let addData = {name: "test" , completed: false}
            return request(app.getHttpServer())
            .post('/todo')   
            .send(addData)
            .expect(201)
            .expect({id: 1, ...addData})
        })
        it('DELETE /todo correctly' , () => {
            return request(app.getHttpServer())
            .delete('/todo/1')   
            .expect(200)
            .expect(
                {
                    "raw": [],
                    "affected": 1
                }
            )
        })  
    });
    afterAll(async () => {
        await app.close();
    });
});
