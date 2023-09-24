const express = require("express");
const { getCollectionDate } = require("./utils.js");
const path = require("path");
const connection = require("./config/connection.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.post("/api/collection-date", async (req, res) => {
    const { address } = req.body;

    console.log(address);

    const resultsStr = await getCollectionDate(address);

    const regexTrash = /Trash: (\w+ \d+\/\d+\/\d+)/;
    const regexRecycle = /Recycle: (\w+ \d+\/\d+\/\d+)/;
    const regexOrganic = /Organics: (\w+ \d+\/\d+\/\d+)/;

    const trash = resultsStr.match(regexTrash);
    const recycle = resultsStr.match(regexRecycle);
    const organics = resultsStr.match(regexOrganic);

    const result = {
        trash: trash ? trash[1] : null,
        recycle: recycle ? recycle[1] : null,
        organics: organics ? organics[1] : null,
    };

    res.json(result);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/users", async (req, res) => {
    connection.query(`SELECT * FROM user`, (error, result) => {
        if (error) throw error;

        console.log(result)
        res.json(result)
    });
});

app.get("/api/comments", async (req, res) => {
    connection.query(`SELECT * FROM comment`, (error, result) => {
        if (error) throw error;

        console.log(result)
        res.json(result)
    });
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
