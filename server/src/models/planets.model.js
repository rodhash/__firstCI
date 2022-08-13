'use strict'

const parse = require('csv-parse').parse
const path = require('path')
const fs = require('fs')

const habitablePlanets = []

const isHabitable = planet =>
    planet.koi_disposition === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '../../data/kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', (data) => {
                if (isHabitable(data)) {
                    habitablePlanets.push(data)
                }
            })
            .on('error', (err) => {
                console.log('error_found: ', err)
                reject(err)
            })
            .on('end', () => {
                console.log(habitablePlanets.map(el => el['kepler_name']))
                console.log(`${habitablePlanets.length} habitable planet(s) found`)
                resolve()
            })
        })
}

module.exports = {
    loadPlanetsData,
    planets: habitablePlanets
}

