const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

const dataFilePath = path.join(__dirname, 'data.json')

app.use(express.json())

const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8')
        return JSON.parse(data || '[]')
    } catch (error) {
        return []
    }
}

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data))
}


app.get('/items', (req, res) => {
    const items = readData()
    res.status(200).send(items)
})


app.post('/items', (req, res) => {
    const items = readData()
    const newItem = {
        id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
        ...req.body,
    }

    items.push(newItem)
    writeData(items)
    res.status(201).send(newItem)
})


app.put('/items/:id', (req, res) => {
    const { id } = req.params
    const updatedItem = req.body

    const items = readData()
    const itemIndex = items.findIndex(item => item.id == id)

    if (itemIndex === -1) return res.status(404).send({ message: 'Item not found' })

    items[itemIndex] = { ...items[itemIndex], ...updatedItem }
    writeData(items)
    res.status(200).send(items[itemIndex])
})


app.delete('/items/:id', (req, res) => {
    const { id } = req.params

    const items = readData()
    const itemIndex = items.findIndex(item => item.id === parseInt(id))

    if (itemIndex === -1) return res.status(404).send({ message: 'Item not found' })

    items = items.filter(item => item.id !== parseInt(id))
    writeData(items)
    res.status(200).send({ message: 'Item deleted successfully' })
})

const PORT = 3000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))