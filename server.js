const express = require("express")
const routes = require("./routes/index")
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const exphbs = require("express-handlebars")

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

const mysql = require("mysql");

if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "bamazondb"
    })
}

connection.connect(err => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return
    }
    console.log("connected as id " + connection.threadId)
});

app.use(routes)

app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT)
});