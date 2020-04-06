const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).json({
        messege: 'Orion Kanban'
    })
})

app.listen(port, () => console.log('Listening on port', port))