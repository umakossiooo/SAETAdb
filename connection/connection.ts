import { Sequelize } from "sequelize-typescript";
import { Product } from "../src/models/client";

const connection = new Sequelize({
database: 'SAETA',
dialect: 'postgres',
username: 'postgres',
password: 'secretpassword1',
storage: ':memory:',
models: [
Product
]
});

async function connectionDB(){
try{
await connection.sync();
}catch(e){
console.log(e);
}
} 

export default connectionDB;
