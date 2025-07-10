import { DataSource } from 'typeorm';
import { Task } from './tasks/task.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'psql1234',
  database: 'todo',
  entities: [Task],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
