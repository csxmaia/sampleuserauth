const express = require('express')
const routes = require('./src/routes')
const cors = require('cors')
require('dotenv').config();

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(process.env.PORT || 3000, () => console.log("localhost:"+process.env.PORT))