const db = require(`${__dirname}/../db/connection`)

exports.fetchArticleById = (id) => {
    const queryValues = []
    queryValues.push(id)
    let sqlString = `SELECT * FROM articles WHERE article_id = $1`
        return db.query(sqlString, queryValues)
        .then((result) => {
            if (result.rows.length === 0){
                return Promise.reject({
                    status : 404,
                    msg: "bad request"
                })
            }
            else {return result.rows[0]}
        })
    }

exports.fetchAllArticles = () => {
    let sqlString = 
    `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url,
    COUNT(comments.article_id) AS comment_count
    FROM comments
    right JOIN articles on articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`
    return db.query(sqlString).then((result) => {
        return result.rows
    })
}