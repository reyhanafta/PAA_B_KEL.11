import { Sequelize } from "sequelize";

const db = new Sequelize('tugas1','root','',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db;