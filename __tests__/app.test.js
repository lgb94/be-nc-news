const request = require('supertest')
const app = require(`${__dirname}/../app`)
const data = require(`${__dirname}/../db/data/test-data`)
const seed = require(`${__dirname}/../db/seeds/seed`)
const db = require(`${__dirname}/../db/connection`)

beforeEach(() => seed(data))
afterAll(() => db.end())

describe('GET api/topics', () => {
    test('sending an API request to api/topics returns a Status-200: responds with an object, with a key topics, which has the value of an array containing all relevant data.', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({body}) => {
                expect(body.topics).toHaveLength(3)
            })
    })
});

describe('GET api', () => {
    test('sending a request to /api returns a Status-200: responds with an object.', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then(({body}) => {
                expect(typeof body).toBe('object')
            })
    })
    test('sending a request to /api returns a Status-200: responds with an object, each value within the object containing the relevant keys - "description", "queries", "exampleResponse", "requestBodyFormat"', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then(({body}) => {
                for (const key in body){
                    expect(body[key]).toMatchObject({
                        "description": expect.any(String),
                        "queries": expect.any(Array),
                        "exampleResponse": expect.any(Object),
                        "requestBodyFormat": expect.any(String)
                    })
                }
            })
    })
});
