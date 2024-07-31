import dotenv from 'dotenv';
import Server from './src/models/server';
dotenv.config();


const server:Server = new Server();

//Launching server
server.listen();