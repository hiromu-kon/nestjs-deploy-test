import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma, Todo } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('hello')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('todos')
  index() {
    return this.appService.fetchTodos();
  }

  @Get('todos/:id')
  async getTodoById(@Param('id') id: string): Promise<Todo | null> {
    return this.appService.fetchTodoById(Number(id));
  }

  @Post('todos')
  async createTodo(@Body() data: Prisma.TodoCreateInput): Promise<Todo | null> {
    return this.appService.createTodo(data);
  }

  @Patch('todos/:id')
  async updateTodo(
    @Param('id') id: string,
    data: Prisma.TodoUpdateInput,
  ): Promise<Todo | null> {
    return this.appService.updateTodo({ id: Number(id), data: data });
  }

  @Delete('todos/:id')
  async deleteTodo(@Param('id') id: string): Promise<Todo | null> {
    return this.appService.fetchTodoById(Number(id));
  }
}
