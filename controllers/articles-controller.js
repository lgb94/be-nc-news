const {fetchArticleById, fetchAllArticles, fetchCommentsById, postCommentWithArticleId} = require(`${__dirname}/../models/articles-model`)

exports.getArticleById = (req, res, next) => {
    const id = req.params.article_id
    fetchArticleById(id).then((article) => {
        res.status(200).send({article})
    })
    .catch((err) =>{
        next(err)
    });
}

exports.getAllArticles = (req, res, next) => {
    fetchAllArticles().then((articles) => {
        res.status(200).send({articles})
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticleCommentsById = (req, res, next) => {
    const id = req.params.article_id
    fetchCommentsById(id).then((comments) => {
        res.status(200).send({comments})
    })
    .catch((err) =>{
        next(err)
    })
}

exports.postComment = (req, res, next) => {
    const id = req.params.article_id
    const commentObject = req.body
    postCommentWithArticleId(id, commentObject).then((comment) => {
        res.status(200).send({comment})
    })
    .catch((err) => {
        next(err)
    })
}