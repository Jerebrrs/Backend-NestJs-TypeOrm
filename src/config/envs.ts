
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
}

const envShema = joi.object({ PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_NAME: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
}).unknown(true);

const { error, value } = envShema.validate({ ...process.env });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbName: envVars.DB_NAME,
  dbUsername: envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD,
};
