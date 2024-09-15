const http = require('http')
const fs = require('fs')
const express = require('express')

const app = express()
app.use(express.json())

app.get('/input', (req, res) => {
    fs.readFile('./input.txt', { encoding: 'utf-8' }, (err, data) => {
        if (err) return res.status(500).send(err.message)
        res.send({
            status: 200,
            data,
        })
    })
})

app.post('/output', (req, res) => {
    fs.writeFile('./output.txt', JSON.stringify(req.body) + '\n', (err) => {
        if (err) res.status(500).send(err.message)
        res.status(201).send('Wrote successfully!👍')
    })
})


app.put('/output', (req, res) => {
    fs.appendFile('./output.txt', JSON.stringify(req.body) + '\n', (err) => {
        if (err) res.status(500).send(err.message)
        res.status(200).send('Updated successfully!👍')
    })
})


app.delete('/output', (req, res) => {
    fs.unlink('./output.txt', (err) => {
        if (err) res.status(500).send(err.message)
        res.status(204).send()
    })
})

app.delete('/output/:line', (req, res) => {
    fs.readFile('./output.txt', { encoding: 'utf-8' }, (err, data) => {
        if (err) return res.status(500).send(err.message)
        const lines = data.split('\n')
        lines.splice(req.params.line - 1, 1)
        fs.writeFile('./output.txt', lines.join('\n'), (err) => {
            if (err) return res.status(500).send(err.message)
            res.status(204).send()
        })
    })
})

const server = http.createServer(app)
const PORT = 3000

server.listen(PORT, () => {
    console.log('Server is listening...')
})