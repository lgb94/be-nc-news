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

exports.fetchCommentsById = (id) => {
    const queryValues = []
    queryValues.push(id)
    let sqlString = `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`
    return db.query(sqlString, queryValues)
    .then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({
                status : 404,
                msg: "bad request"
            })
        }
        else {return result.rows}
    })
}

exports.postCommentWithArticleId = (id, commentObject) => {
    
    if (!Object.keys(commentObject).includes('username', 'body') || Object.keys(commentObject).length !== 2){
        return Promise.reject({
            status : 400,
            msg : "bad request"
        })
    }
    const articleId = id
    const author = commentObject.username
    const body = commentObject.body
    const votes = 0

    // console.log(articleId, '<<<< article_id to add comment to')
    // console.log(author, '<<<< author (username) to attach to comment')
    // console.log(body, '<<<< body to attach to comment')
    // console.log(votes, '<<<< votes to attach to comment')
    // console.log(createdAt, '<<<< created_At to attach to comment')

    // const newCommentArray = []
    // newCommentArray.push(body)
    // newCommentArray.push(author)
    // newCommentArray.push(articleId)
    // newCommentArray.push(votes)
    // need body, article_id, author, votes, created_at

    return db.query("INSERT INTO comments (body, author, article_id, votes) VALUES ($1, $2, $3, $4) RETURNING *;", [body, author, articleId, votes])
    .then((result) => {
        return result.rows[0]
    })
    
    
}