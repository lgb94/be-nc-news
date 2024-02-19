const express = require("express");
const { getTopics } = require(`${__dirname}/controllers/topics-controller`)
const { getEndpoints } = require(`${__dirname}/controllers/endpoints-controller`)
const {handleServerErrors} = require(`${__dirname}/controllers/errors-controller`)

const app = express();

app.use(express.json());

app.get('/api', getEndpoints)

app.get('/api/topics', getTopics);


app.use(handleServerErrors);

module.exports = app;