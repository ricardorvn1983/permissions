import dotenv from 'dotenv';
import Server from './models/server';

dotenv.config();
export const server = new Server;
server.listen();


