export const createLocalDateToUtc = ():string =>{
    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    const localDatetoUtc = (new Date(Date.now() - tzOffset)).toISOString() ;
    return localDatetoUtc;
}

export const fieldsToUtf8 = (results: any)=> {
    results.map((fields: any)=> {
        for (let i in fields) {
            if (typeof (fields[i]) === "object") {
                fields[i] = fields[i].toString('utf8').trim();
            }
        }
    });
}