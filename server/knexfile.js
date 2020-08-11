require("dotenv").config();
const options = {
    development: {
        client: 'mysql2',
        connection: {
            host : process.env.DATABASE_HOST,
            user : process.env.DATABASE_USER,
            password : process.env.DATABASE_PASSWORD,
            database : process.env.DATABASE_NAME
        },
        migrations: {
            directory: __dirname + '/Database/migrations',
        },
        seeds: {
            directory: __dirname + '/Database/seeds',
        },
        pool: { min: 5, max: 30 }
    }
}

module.exports = options;
