const {fetchArticles} = require(`${__dirname}/../models/articles-model`)

exports.getArticles = (req, res, next) => {
    const id = req.params.article_id
    fetchArticles(id).then((article) => {
        res.status(200).send({article})
    })
    .catch((err) =>{
        next(err)
    });
}