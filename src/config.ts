import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      user: process.env.POSTGRES_USER,
      dbName: process.env.POSTGRES_DB,
      port: Number(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
    },
  };
});
