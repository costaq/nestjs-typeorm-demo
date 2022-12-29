import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

export default TypeOrmModule.forRoot({
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'test',
  password: 'Costa912',
  database: 'test2',
  entities: [User],
  synchronize: true,
  options: {
    encrypt: false,
  },
});
