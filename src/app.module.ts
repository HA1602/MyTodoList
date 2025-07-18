import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'psql1234',
      database: 'todo',
      autoLoadEntities: true,
      synchronize: true,

      extra: { max: 5 },
    }),
  ],
})
export class AppModule {}
