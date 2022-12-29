var mysql = require('mysql')
var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})
connection.connect((err) => {
    if (err) {
        console.log("Error in connection " + err)
        return
    }
    console.log('Database connected')
})
module.exports = connection