import * as dotenv from 'dotenv';
import { DataSourceOptions} from 'typeorm';
import { UserEntity } from './recources/users/entities/user.entity'

dotenv.config();

export default {
    type: 'postgres',
    host: process.env.POSTGRES_HOST as string,
    port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
    entities: [ UserEntity ], 
    migrations: [ 'dist/**/migration/*.js' ],
    migrationsRun: true,
    synchronize: false,
} as DataSourceOptions;
