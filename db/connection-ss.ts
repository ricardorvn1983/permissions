import { Sequelize } from "sequelize";

const database = process.env.SFCDB || "BGH_SFC";
const user = process.env.SFCUSER || "";
const pass = process.env.SFCPASS || ""; 
const host = process.env.SFCHOST || "ARRGA-VS-DB004.ar.bgh.corp";

const dbSFC = new Sequelize( database, user, pass, {
    host,
    dialect : "mssql"
})

export default dbSFC;
