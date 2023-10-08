const express = require("express");
const { getCollectionDate } = require("./utils.js");
const path = require("path");
const connection = require("./config/connection.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/comments", async (req, res) => {
    connection.query(`SELECT * FROM comments`, (error, result) => {
        if (error) throw error;

        console.log(result)
        res.json(result)
    });
});

app.post("/api/comments", async (req, res) => {
    const { comment, userName, date, title } = req.body;

    console.log({ comment, userName, date, title });

    connection.query(`INSERT INTO comments (userName, comment, date, title)
    VALUES ('${userName}', '${comment}', '${date}', '${title}')`, (error, result) => {
        if (error) throw error;

        console.log(result)
        res.json(result)
    });
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
