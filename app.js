const express = require("express");
const { getTopics } = require(`${__dirname}/controllers/topics-controller`)
const { getArticleById, getAllArticles } = require(`${__dirname}/controllers/articles-controller`)
const { getEndpoints } = require(`${__dirname}/controllers/endpoints-controller`)
const {handleCustomErrors, handlePSQLErrors, handleServerErrors} = require(`${__dirname}/controllers/errors-controller`)

const app = express();

app.use(express.json());

app.get('/api', getEndpoints);

app.get('/api/topics', getTopics);

app.get('/api/articles', getAllArticles);

app.get('/api/articles/:article_id', getArticleById);


app.use(handleCustomErrors)

app.use(handlePSQLErrors)

app.use(handleServerErrors)

module.exports = app;