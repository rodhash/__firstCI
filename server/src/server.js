const http = require('http')

const app = require('./app')

const { loadPlanetsData } = require('../src/models/planets.model')
const process = require('process')
const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startUp() {
    await loadPlanetsData()
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}

startUp()

