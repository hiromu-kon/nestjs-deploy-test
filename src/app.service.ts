import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async fetchTodos() {
    return this.prisma.todo.findMany();
  }

  async fetchTodoById(id: number): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async createTodo(data: Prisma.TodoCreateInput): Promise<Todo | null> {
    return this.prisma.todo.create({
      data,
    });
  }

  async updateTodo(params: {
    id: number;
    data: Prisma.TodoUpdateInput;
  }): Promise<Todo> {
    const { data } = params;
    return this.prisma.todo.update({
      data,
      where: {
        id: params.id,
      },
    });
  }

  async deleteTodo(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return this.prisma.todo.delete({
      where,
    });
  }
}
