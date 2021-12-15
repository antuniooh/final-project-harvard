const Database = require("./config")

const initDb = {
    async init(){
        const db = await Database()

        // create table users
        await db.exec(`CREATE TABLE users ( )`);

        // create table finances
        await db.exec(`CREATE TABLE finances (        )`);

        await db.close()
    }
}

initDb.init();