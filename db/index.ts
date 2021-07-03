import { Client, Pool } from 'pg';

export const client = new Client({
    host: 'localhost',
    port: 5334,
    user: 'postgres',
    database: 'user',
    password: 'Pass123'
});

export const pool = new Pool({
    host: 'localhost',
    port: 5334,
    user: 'postgres',
    database: 'user',
    password: 'Pass123'
});