let clients :any[] = [];

const addClientDisconnectListener = (client: any): void =>{
    client.on ('close',()=>{
        console.log(`Client closed connection`);
        removeClient(client)
        client.end();
    })
}

export const addClient = (client: any): void =>{
    clients.push (client);
    addClientDisconnectListener(client);
}

export const removeClient = (client: any): void =>{
    clients.splice(clients.indexOf(client), 1);
}

export const broadcastMsg = (event: string, action: string, data: string): void =>{
    clients.map(client=>{
        client.write(`event: ${ event }\ndata: {"action":"${ action }","data": ${ data }}\n\n`);
    })   
}