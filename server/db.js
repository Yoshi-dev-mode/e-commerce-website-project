const Pool = require('pg').Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "Pogisievan123",
    port: 5432,
    database: "food_ordered"
})

module.exports = pool