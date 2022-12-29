const express = require("express")
const bp = require("body-parser")
require('dotenv').config();

var app = express()
app.use(bp.json())


const product = require("./Routes/innsertRoutingy")

app.use('/insert', product)


app.listen(process.env.PORT, () => {
    console.log("SERVER START")
})