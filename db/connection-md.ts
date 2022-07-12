import { Sequelize } from "sequelize";

const database = process.env.PSHDB || 'psh';
const user = process.env.PSHUSER || 'php_query'
const pass = process.env.PSHPASS || 'php'
const host = process.env.PSHHOST || '10.0.64.28'
const db = new Sequelize( database, user, pass,{
    host,
    dialect :"mariadb",
    define: {
        timestamps: false
    }
})

export default db;
