import { Request, Response } from "express";
const NodeCache = require ('node-cache');
export const cache = new NodeCache();

export const appliedCache = ( duration: number ) => (req: Request, res: Response, next: Function): Function | void =>{
    if (req.method !== 'GET') return next();
    const key = req.originalUrl;
    const cacheResponse = cache.get(key);
    if (cacheResponse) {
        console.log ("send from cache");
        res.send(cacheResponse);
    }else {
        console.log ("send from server");
        res.originalSend  = res.send;
        (res.send as any) = (body: any): void =>{
            res.originalSend (body);
            cache.set (key, body, duration)
        }
        next();
    }
}