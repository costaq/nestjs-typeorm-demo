import { User } from '../users/users.entity';

export default {
  // 端口
  port: parseInt(process.env.PORT, 10) || 3000,
  // 数据库配置
  DATABASE_CONFIG: {
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
  },
  // redis配置
  REDIS_CONFIG: {
    name: 'redis',
    url: 'redis://Password01!@127.0.0.1:6379/4',
  },
};
