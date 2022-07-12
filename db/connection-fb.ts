import { fieldsToUtf8 } from "../helpers/toutc";

const Firebird = require ('node-firebird');
const util = require ('util');
const options = {
    host: '10.0.97.19',
    port: 3050,
    database: 'c:\\BDs\\PSHv3.fdb',
    user: 'SYSDBA',
    password: '',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
    retryConnectionInterval: 1000, 
};

const dbQuery = (db: any, sql: string): Promise<any> => {
    return new Promise((resolve, reject)=> {
        db.query(sql, (err: any, result: any): [] | void => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

const attachDb = util.promisify (Firebird.attach);
export const prepareFbQuery = async (sql: string): Promise<[]> =>{
    const db = await attachDb (options);
    const results: [] = await dbQuery (db, sql);
    fieldsToUtf8(results);
    db.detach();
    return results;
}


