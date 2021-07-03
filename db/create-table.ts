import { client } from './index'

const query = `CREATE TABLE users(
    id serial primary key,
    username varchar(64) unique not null,
    email varchar(256) unique not null,
    password varchar(256) not null)`;

client.connect().then(() => {
    return client.query(query);
}).then(res => {
    console.log(res);
}).catch(err => console.log(err));


