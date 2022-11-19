import { Controller } from '@nestjs/common';
import { Get, Post, Body, Delete, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity/todo.entity';
import { Repository } from 'typeorm';

@Controller('todo')
export class TodoController {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly taskRepo: Repository<TodoEntity>,
    ) {}
  
    @Get()
    findAll(): Promise<TodoEntity[]> {
        return this.taskRepo.find();
    }
    @Post()
    create(@Body() todo: TodoEntity) {
        return this.taskRepo.save(todo);
    }
  
    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.taskRepo.delete(id);
    }
}
