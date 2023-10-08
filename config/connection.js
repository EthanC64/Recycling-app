// get the client
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// create the connection to database
let connection = null;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
    });
}

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("connection no errors");
    }
});

module.exports = connection;
