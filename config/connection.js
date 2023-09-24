// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "trashapp_db",
    password: "rootroot",
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("connection no errors");
    }
});

module.exports = connection;
