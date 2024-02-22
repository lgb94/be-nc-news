const request = require('supertest')
const app = require(`${__dirname}/../app`)
const data = require(`${__dirname}/../db/data/test-data`)
const seed = require(`${__dirname}/../db/seeds/seed`)
const db = require(`${__dirname}/../db/connection`)

beforeEach(() => seed(data))
afterAll(() => db.end())

describe('GET api/topics', () => {
    test('GET api/topics gives Status-200: responds with an object, with a key topics, which has the value of an array containing all relevant data.', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({body}) => {
                expect(body.topics).toHaveLength(3)
            })
    })
});

describe('GET api', () => {
    test('GET /api gives Status-200: responds with an object.', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then(({body}) => {
                expect(typeof body).toBe('object')
            })
    })
    test('GET /api gives Status-200: responds with an object with relevant keys - "description", "queries", "exampleResponse", "requestBodyFormat"', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then(({body}) => {
                for (const key in body){
                    expect(body[key]).toMatchObject({
                        "description": expect.any(String),
                        "queries": expect.any(Array),
                        "exampleResponse": expect.any(Object),
                        "requestBodyFormat": expect.any(Object)
                    })
                }
            })
    })
});

describe('GET api/articles/:article_id', () => {
    test('GET /api/articles/1 gives Status-200: responds with an object, key of articles, value of the article matching the given id (1).', () => {
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
    test('GET /api/articles/0 gives Status-404 - no articles match ID (0), so returned object with "msg" key "bad request".', () => {
        return request(app)
            .get('/api/articles/0')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })
    })
    test('GET /api/articles/fish gives Status-400 - PSQL error caught (wrong input type) returned object with "msg" key "bad request".', () => {
        return request(app)
            .get('/api/articles/fish')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })
    })
});

describe('GET api/articles', () => {
    test('GET /api/articles gives Status-200: returns object, key - articles, value - array of ALL articles (13).', () => {
        return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                const articles = body.articles
                expect(articles).toHaveLength(13)
            })
    })
    test('GET /api/articles gives Status-200: returns object, key - articles, value - array of ALL articles, articles have ALL required keys.', () => {
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
    test('GET /api/articles gives Status-200: returns object, key - articles, value - array of ALL articles, articles have ALL required keys, sorted by "created_at" value in descending order', () => {
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
    test('GET /api/articles/1/comments gives Status-200: returns object, key - comments, value - array of comments (11 total) relevant to given id (1)', () => {
        return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({body}) => {
                const comments = body.comments
                expect(comments).toHaveLength(11)
                comments.forEach((comment) => {
                    expect(comment.article_id).toBe(1)
                })
            })
    })
    test('GET /api/articles/3/comments gives Status-200: returns object, key - comments, value - array of comments (2 total) relevant to given id (3). Comments have ALL required properties', () => {
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
    test('GET /api/articles/1/comments gives Status-200: returns object, key - comments, value - array of comments (11 total) relevant to given id (1), Comments have ALL required properties. Returned array has most recent comment 1st', () => {
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
    test('GET /api/articles/2/comments gives Status 200: returns object, key - comments, value - [] (an empty array) - given id 2 has no comments.', () => {
        return request(app)
            .get('/api/articles/2/comments')
            .expect(200)
            .then(({body}) => {
                expect(body).toMatchObject({comments : []})
            })
    })
    test('GET /api/articles/20000/comments returns Status-404: article_id is valid (a number), but does not exist. object returned has key "msg", value - "bad request"', () => {
        return request(app)
            .get('/api/articles/20000/comments')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })
    })
    test('GET /api/articles/dogdirt/comments returns Status-400: article_id that isnt a number (invalid) - PSQL error caught, object returned, key - msg, value - "bad request"', () => {
        return request(app)
            .get('/api/articles/dogdirt/comments')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })
    })
});

describe('POST api/articles/:article_id/comments', () => {
    test(`POST /api/articles/1/comments with a valid request (username on users table, valid body, no other keys) returns Status-200, adds given comment to comment table, returns object, key - comment, value - object with new comments table entry.`, () => {
        return request(app)
        .post('/api/articles/1/comments')
        .send({ 
            username: "rogersop", 
            body : "spaceships dont come equipped with rear view mirrors"
            })
            .expect(200)
            .then(({body}) => {
                const comment = body.comment
                expect(comment).toMatchObject({
                    "comment_id" : 19,
                    "votes" : 0,
                    "created_at" : expect.any(String),
                    "author" : "rogersop",
                    "body" : "spaceships dont come equipped with rear view mirrors",
                    "article_id" : 1
                })
            })          
    })
    test(`POST /api/articles/5000/comments : invalid article_id (number - doesnt exist) gives Status-404, returns object, key - msg, value - "bad request".`, () => {
        return request(app)
            .post('/api/articles/5000/comments')
            .send({ 
                username: "rogersop", 
                body : "be responsible for what you say because the words you speak can truly cause dismay"
            })
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })          
    })
    test(`POST /api/articles/andrewdoesntsweat/comments : invalid article_id (not a number) gives status-400, returns object, key - msg, value - "bad request".`, () => {
        return request(app)
            .post('/api/articles/andrewdoesntsweat/comments')
            .send({ 
                username: "rogersop", 
                body : "america america now im going africa my death is money"
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })          
    })
    test(`POST /api/articles/1/comments with INVALID USERNAME (not found in users table) gives Status-404, returns object, key - msg, value - "bad request".`, () => {
        return request(app)
            .post('/api/articles/1/comments')
            .send({ 
                username: "GiveDollarRobert", 
                body : "I close my eyes and seize it, i clench my fists and beat it, i light my torch and burn it, i am the beast i worship"
            })
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })          
    })
    test(`POST /api/articles/1/comments with a valid username ONLY (single key on request object) gives status-400, returns an object, key - msg, value - "bad request".`, () => {
        return request(app)
            .post('/api/articles/1/comments')
            .send({ 
                username: "rogersop" 
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })          
    })
    test(`POST /api/articles/1/comments with valid username, a valid body AND an EXTRA KEY on request objectgives status-400, returns an object, key - msg, value -"bad request".`, () => {
        return request(app)
            .post('/api/articles/1/comments')
            .send({ 
                username: "rogersop",
                body : "I can let these dream killers kill my self esteem or use my arrogance as the steam to power my dreams", 
                mysteryThirdKey: "I'm here to attempt break your test"
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })          
    })
    test(`POST /api/articles/1/comments with valid username, given body = null gives status-400, object returned with key - msg, value - "bad request".`, () => {
        return request(app)
            .post('/api/articles/1/comments')
            .send({ 
                username: "rogersop",
                body : null 
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })          
    })
    
})

describe('PATCH api/articles/:article_id', () => {
    test('PATCH /api/articles/2 gives Status-200 when given a valid object: responds with an object, key of article, value of the article matching the given id (2) votes value updated by the amount given in the request object (0 >>> 50).', () => {
        return request(app)
            .patch('/api/articles/2')
            .send({
                inc_votes: 50
            })
            .expect(200)
            .then(({body}) => {
                expect(body.article).toMatchObject({
                    "author": expect.any(String),
                    "title": expect.any(String),
                    "article_id": 2,
                    "body": expect.any(String),
                    "created_at": expect.any(String),
                    "votes": 50,
                    "article_img_url": expect.any(String)
                })
            })
    })
    test('PATCH /api/articles/2 gives Status-200 when given a valid object: responds with an object, key of article, value of the article matching the given id (2) votes value updated by the amount given in the request object (0 >>> -50).', () => {
        return request(app)
            .patch('/api/articles/2')
            .send({
                inc_votes: -50
            })
            .expect(200)
            .then(({body}) => {
                expect(body.article).toMatchObject({
                    "author": expect.any(String),
                    "title": expect.any(String),
                    "article_id": 2,
                    "body": expect.any(String),
                    "created_at": expect.any(String),
                    "votes": -50,
                    "article_img_url": expect.any(String)
                })
            })
    })
    test('PATCH /api/articles/2000 : invalid article_id (number - doesnt exist) gives Status-404, returns object, key - msg, value - "bad request"', () => {
        return request(app)
            .patch('/api/articles/2000')
            .send({
                inc_votes: -50
            })
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('bad request')
            })
    })
    test('PATCH /api/articles/thelatestone : invalid article_id (incorrect data type) gives Status-400, returns object, key - msg, value - "bad request"', () => {
        return request(app)
            .patch('/api/articles/thelatestone')
            .send({
                inc_votes: -50
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('bad request')
            })
    })
    test('PATCH /api/articles/2 : invalid request (wrong key) gives Status-400, returns object, key - msg, value - "bad request"', () => {
        return request(app)
            .patch('/api/articles/2')
            .send({
                dont_inc_vote: 450
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('bad request')
            })
    })
    test('PATCH /api/articles/2 : invalid request (value given not a number) gives Status-400, returns object, key - msg, value - "bad request"', () => {
        return request(app)
            .patch('/api/articles/2')
            .send({
                inc_votes: 'nobody voted for this one'
            })
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('bad request')
            })
    })
})

describe('DELETE api/comments/:comment_id', () => {
    test('DELETE /api/comments/3 gives Status-204 A valid comment_id deletes respective comment from comments database. Returns an empty object', () => {
        return request(app)
            .delete('/api/comments/3')
            .expect(204)
            .then(({body}) => {
                expect(body).toEqual({})
            })
    })
    test('DELETE /api/comments/30000 gives Status-404 A valid comment_id but doesnt exist in db returns object, key - msg, value - bad request', () => {
        return request(app)
            .delete('/api/comments/30000')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })
    })
    test('DELETE /api/comments/swagmaster gives Status-400: invalid comment_id PSQL errors db and returns object, key - msg, value - bad request', () => {
        return request(app)
            .delete('/api/comments/swagmaster')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("bad request")
            })
    })
})