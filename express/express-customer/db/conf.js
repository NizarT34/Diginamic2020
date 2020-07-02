const {Pool} = require('pg');

const db = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'expressDB',
    user: 'express',
    password: 'express'
});



module.exports = db;