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

describe('GET api/articles/:article_id', () => {
    test('sending an API request to api/articles/1 returns a Status-200: responds with an object, with a key articles, which has the value of the article matching the given id - in this case - 1.', () => {
        return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({body}) => {
                expect(body.article).toMatchObject({
                    "author": expect.any(String),
                    "title": expect.any(String),
                    "article_id": 1,
                    "body": expect.any(String),
                    "created_at": expect.any(String),
                    "votes": expect.any(Number),
                    "article_img_url": expect.any(String)
                })
            })
    })
    test('sending an API request to api/articles/0 returns an error: since no articles match the ID Of 0, the empty result should be caught with a 404.', () => {
        return request(app)
            .get('/api/articles/0')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })
    })
    test('sending an API request to api/articles/fish returns a PSQL error: article_id values will always be numbers so code 400 should be thrown, along with "bad request".', () => {
        return request(app)
            .get('/api/articles/fish')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })
    })
});

describe('GET api/articles', () => {
    test('sending an API request to api/articles returns a Status-200: responds with an object, with a key articles, which has the value of an array of ALL articles, in this case - 13 total.', () => {
        return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                const articles = body.articles
                expect(articles).toHaveLength(13)
            })
    })
    test('sending an API request to api/articles returns a Status-200: responds with an object, with a key articles, which has the value of an array of ALL articles, with the correct keys assigned', () => {
        return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                const articles = body.articles
                articles.forEach((article) => {
                    expect(article).toMatchObject({
                        "author": expect.any(String),
                        "title": expect.any(String),
                        "article_id": expect.any(Number),
                        "topic": expect.any(String),
                        "created_at": expect.any(String),
                        "votes": expect.any(Number),
                        "article_img_url": expect.any(String),
                        "comment_count": expect.any(String)
                    })
                })
            })
    })
    test('sending an API request to api/articles returns a Status-200: responds with an object, with a key articles, which has the value of an array of ALL articles, with the correct keys assigned, and is sorted by created_at in descending order', () => {
        return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                const articles = body.articles
                articles.forEach((article) => {
                    expect(article).toMatchObject({
                        "author": expect.any(String),
                        "title": expect.any(String),
                        "article_id": expect.any(Number),
                        "topic": expect.any(String),
                        "created_at": expect.any(String),
                        "votes": expect.any(Number),
                        "article_img_url": expect.any(String),
                        "comment_count": expect.any(String)
                    })
                })
                expect(articles[0].created_at).toBe('2020-11-03T09:12:00.000Z')
                expect(articles[12].created_at).toBe('2020-01-07T14:08:00.000Z')
            })
    })
});

describe('GET api/articles/:article_id/comments', () => {
    test('sending an API request to api/articles/:articles_id/comments returns a Status-200: responds with an object, with a key comments, which has the value of an array of comments relevant to given id - in this case, article id 1 should have 11 comments.', () => {
        return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({body}) => {
                const comments = body.comments
                expect(comments).toHaveLength(11)
            })
    })
    test('sending an API request to api/articles/:articles_id/comments returns a Status-200: responds with an object, with a key comments, which has the value of an array of comments relevant to given id - in this case, article id 3 should have 2 comments. Each comment has the required properties', () => {
        return request(app)
            .get('/api/articles/3/comments')
            .expect(200)
            .then(({body}) => {
                const comments = body.comments
                expect(comments).toHaveLength(2)
                comments.forEach((comment) => {
                    expect(comment).toMatchObject({
                        "comment_id" : expect.any(Number),
                        "votes" : expect.any(Number),
                        "created_at" : expect.any(String),
                        "author" : expect.any(String),
                        "body" : expect.any(String),
                        "article_id" : 3
                    })
                })
            })
    })
    test('sending an API request to api/articles/:articles_id/comments returns a Status-200: responds with an object, with a key comments, which has the value of an array of comments relevant to given id - in this case, article id 1 should have 11 comments. Each comment has the required properties. The returned array is returned with its most recent comment 1st', () => {
        return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({body}) => {
                const comments = body.comments
                expect(comments).toHaveLength(11)
                comments.forEach((comment) => {
                    expect(comment).toMatchObject({
                        "comment_id" : expect.any(Number),
                        "votes" : expect.any(Number),
                        "created_at" : expect.any(String),
                        "author" : expect.any(String),
                        "body" : expect.any(String),
                        "article_id" : 1
                    })
                })
                expect(comments[0].comment_id).toBe(5)
                expect(comments[10].comment_id).toBe(9)
            })
    })
    test.only('sending an API request to an article_id that returns no results returns a Status-404, and an object with msg key "bad request"', () => {
        return request(app)
            .get('/api/articles/2/comments')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })
    })
    test('sending an API request with an article_id that isnt a number (invalid) returns a Status-400, and an object with msg key "bad request"', () => {
        return request(app)
            .get('/api/articles/dogdirt/comments')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })
    })
});