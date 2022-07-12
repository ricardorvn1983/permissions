import express, { Application } from 'express';
import cors from 'cors';
import permissionRoute from '../routes/permission';
import lineRoute from "../routes/line";
import personRoute from "../routes/person";
import motiveRoute from "../routes/motive";
import conceptRoute from "../routes/concept";
import subscribeRoute from "../routes/subscribe";
import permissionTypeRoute from "../routes/permissions_types";
import terminalLogRoute from "../routes/terminal_logs";
import pshdb from '../db/connection-md';
import sfcdb from '../db/connection-ss';

class Server {
    #app: Application;
    #port: string;
    apiPaths = {
        terminal_logs: '/api/v1/terminal_logs',
        permissions: '/api/v1/permissions',
        lines: '/api/v1/lines',
        persons: '/api/v1/persons',
        motives: '/api/v1/motives',
        concepts: '/api/v1/concepts',
        subscribes: '/api/v1/subscribes',
        permissions_types: '/api/v1/permissions-types'
    }
    constructor(){
         this.#app = express();   
         this.#port = process.env.PORT || '8000'
         this.pshDbConnect();
         this.sfcDbConnect();
         this.middlewares();
         this.routes();
    }
    middlewares(){
        this.#app.use (cors());
        this.#app.use (express.json());
    }
    routes(){
        this.#app.use (this.apiPaths.permissions, permissionRoute);
        this.#app.use (this.apiPaths.lines, lineRoute );
        this.#app.use (this.apiPaths.persons, personRoute);
        this.#app.use (this.apiPaths.motives, motiveRoute);
        this.#app.use (this.apiPaths.concepts, conceptRoute);
        this.#app.use (this.apiPaths.subscribes, subscribeRoute);
        this.#app.use (this.apiPaths.permissions_types, permissionTypeRoute);
        this.#app.use (this.apiPaths.terminal_logs, terminalLogRoute);
    }
    listen(){
        this.#app.listen(this.#port,()=>{
            console.log ("Server is Running - PORT :" + this.#port);
        })
    }
    async pshDbConnect(){
        try {
            await pshdb.authenticate();
            console.log ("Connected to PSH DB");
        }catch ( e: any ){
            throw new Error ( e )
        }
    }
    async sfcDbConnect(){
        try {
            await sfcdb.authenticate();
            console.log ("Connected to SFC DB");
        }catch ( e: any ){
            throw new Error ( e )
        }
    }
}

export default Server;