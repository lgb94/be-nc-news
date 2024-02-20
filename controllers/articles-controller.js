const {fetchArticleById, fetchAllArticles} = require(`${__dirname}/../models/articles-model`)

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