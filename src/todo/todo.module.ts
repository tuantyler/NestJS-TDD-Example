import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoEntity } from './todo.entity/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController]
})
export class TodoModule {}
