const express = require("express");
const { getTopics } = require(`${__dirname}/controllers/topics-controller`)
const { getUsers } = require(`${__dirname}/controllers/users-controller`)
const { deleteComment } = require(`${__dirname}/controllers/comments-controller`)
const { getArticleById, getAllArticles, getArticleCommentsById, postComment, patchArticleVotes } = require(`${__dirname}/controllers/articles-controller`)
const { getEndpoints } = require(`${__dirname}/controllers/endpoints-controller`)
const {handleCustomErrors, handlePSQLErrors, handleServerErrors} = require(`${__dirname}/controllers/errors-controller`)

const app = express();

app.use(express.json());

app.get('/api', getEndpoints);

app.get('/api/topics', getTopics);

app.get('/api/users', getUsers);

app.get('/api/articles', getAllArticles);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles/:article_id/comments', getArticleCommentsById);

app.post('/api/articles/:article_id/comments', postComment);

app.patch('/api/articles/:article_id', patchArticleVotes);

app.delete('/api/comments/:comment_id', deleteComment)

app.use(handleCustomErrors)

app.use(handlePSQLErrors)

app.use(handleServerErrors)

module.exports = app;