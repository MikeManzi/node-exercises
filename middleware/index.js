const express = require("express")

const app = express()

const middleware = (req, res, next) => {
    console.log(`Time of the request: ${new Date()}`)
    next()
}

app.use("/api", middleware)

app.get('/api/home', (req, res) => {
    res.send("Hello World")
})

const PORT = 3000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))