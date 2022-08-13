
const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
        // no longer needed
        // expect(response.statusCode).toBe(200)
    })
})

describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'USS Enterprise mission',
        rocket: 'NCC 1701-D',
        target: 'Kepler 186 f',
        launchDate: 'January 4, 2028'
    }

    const launchDataWithoutDate = {
        mission: 'USS Enterprise mission',
        rocket: 'NCC 1701-D',
        target: 'Kepler 186 f',
    }

    const launchDataWithInvalidDate = {
        mission: 'USS Enterprise mission',
        rocket: 'NCC 1701-D',
        target: 'Kepler 186 f',
        launchDate: 'zoo'
    }

    test('It should responde with 201 sucess', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201)


        // Now Jest Assertions, not SUPERTEST
        const requestDate = new Date(completeLaunchData.launchDate).valueOf()
        const responseDate = new Date(response.body.launchDate).valueOf()
        expect(responseDate).toBe(requestDate)

        expect(response.body).toMatchObject(launchDataWithoutDate)
    })

    test('It should catch missing properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400)

        // Jusing Jest (expect func)
        expect(response.body).toStrictEqual({
            error: "Missing required property"
        })
    })

    // date is returned in stringlyfied version
    test('It should catch invalid date', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400)

        // Jusing Jest (expect func)
        expect(response.body).toStrictEqual({
            error: "Invalid / Missing date"
        })

    })
})

