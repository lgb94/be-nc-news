const db = require(`${__dirname}/../db/connection`)

exports.fetchArticleById = (id) => {
    const queryValues = []
    queryValues.push(id)

    let sqlString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes,articles.body, articles.article_img_url,
    COUNT(comments.article_id) ::int AS comment_count
    FROM comments
    right JOIN articles on articles.article_id = comments.article_id 
    WHERE articles.article_id = $1
    GROUP BY articles.article_id`

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

exports.fetchAllArticles = (queryObject) => {

    const columns = ["author", "title", "article_id", "topic", "created_at", "votes", "article_img_url"]

    let queries = Object.keys(queryObject).filter((item) => {
        return item !== "sort_by" && item !== "order"
      })

    if (queries.length > 0){
        
        let queriesArray = []

        let sqlString = 
        `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url,
        COUNT(comments.article_id) ::int AS comment_count
        FROM comments
        right JOIN articles on articles.article_id = comments.article_id`

        for (let i = 0; i < queries.length; i++){
            if (i === 0) {
                if (queries[i] === 'topic') {
                    sqlString += ` WHERE articles.topic = $1`;
                    queriesArray.push(queryObject[queries[i]])
                }
                else if (queries[i] === 'author') {
                    sqlString += ` WHERE articles.author = $1`;
                    queriesArray.push(queryObject[queries[i]])
                }
                else if (queries[i] === 'title') {
                    sqlString += ` WHERE articles.title = $1`;
                    queriesArray.push(queryObject[queries[i]])
                }
                else if (queries[i] === 'article_id') {
                    sqlString += ` WHERE articles.article_id `;
                    if (typeof queryObject[queries[i]] === 'string') {
                        sqlString += '= $1'
                        queriesArray.push(queryObject[queries[i]])
                    }
                    if (typeof queryObject[queries[i]] === 'object') {
                        let parameter = Object.keys(queryObject[queries[i]])
                        if (parameter[0] === 'gt') {
                            sqlString += '> $1'
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'gte') {
                            sqlString += '>= $1'
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'lt') {
                            sqlString += '< $1'
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'lte') {
                            sqlString += '<= $1'
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'ne') {
                            sqlString += '!= $1'
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else return Promise.reject({
                            status : 404,
                            msg: "bad request"
                        })
                    }
                }
                else if (queries[i] === 'votes') {
                    sqlString += ` WHERE articles.votes `;
                    if (typeof queryObject[queries[i]] === 'string') {
                        sqlString += '= $1'
                        queriesArray.push(queryObject[queries[i]])
                    }
                    if (typeof queryObject[queries[i]] === 'object') {
                        let parameter = Object.keys(queryObject[queries[i]])
                        if (parameter[0] === 'gt') {
                            sqlString += '> $1'
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'gte') {
                            sqlString += '>= $1'
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'lt') {
                            sqlString += '< $1'
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'lte') {
                            sqlString += '<= $1'
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'ne') {
                            sqlString += '!= $1'
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else return Promise.reject({
                            status : 404,
                            msg: "bad request"
                        })
                    }
                }
                else return Promise.reject({
                    status : 404,
                    msg: "bad request"
                })
        }
            else {
                if (queries[i] === 'topic') {
                    sqlString += ` AND articles.topic = $${i+1}`;
                    queriesArray.push(queryObject[queries[i]])
                }
                else if (queries[i] === 'author') {
                    sqlString += ` AND articles.author = $${i+1}`;
                    queriesArray.push(queryObject[queries[i]])
                }
                else if (queries[i] === 'title') {
                    sqlString += ` AND articles.title = $${i+1}`;
                    queriesArray.push(queryObject[queries[i]])
                }
                else if (queries[i] === 'article_id') {
                    sqlString += ` AND articles.article_id `;
                    if (typeof queryObject[queries[i]] === 'string') {
                        sqlString += `= $${i+1}`
                        queriesArray.push(queryObject[queries[i]])
                    }
                    if (typeof queryObject[queries[i]] === 'object') {
                        let parameter = Object.keys(queryObject[queries[i]])
                        if (parameter[0] === 'gt') {
                            sqlString += `> $${i+1}`
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'gte') {
                            sqlString += `>= $${i+1}`
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'lt') {
                            sqlString += `< $${i+1}`
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'lte') {
                            sqlString += `<= $${i+1}`
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'ne') {
                            sqlString += `!= $${i+1}`
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else return Promise.reject({
                            status : 404,
                            msg: "bad request"
                        })
                    }
                }
                else if (queries[i] === 'votes') {
                    sqlString += ` AND articles.votes `;
                    if (typeof queryObject[queries[i]] === 'string') {
                        sqlString += `= $${i+1}`
                        queriesArray.push(queryObject[queries[i]])
                    }
                    if (typeof queryObject[queries[i]] === 'object') {
                        let parameter = Object.keys(queryObject[queries[i]])
                        if (parameter[0] === 'gt') {
                            sqlString += `> $${i+1}`
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'gte') {
                            sqlString += `>= $${i+1}`
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'lt') {
                            sqlString += `< $${i+1}`
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'lte') {
                            sqlString += `<= $${i+1}`
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else if (parameter[0] === 'ne') {
                            sqlString += `!= $${i+1}`
                            queriesArray.push(1*queryObject[queries[i]][parameter[0]])
                        }
                        else return Promise.reject({
                            status : 404,
                            msg: "bad request"
                        })
                    }
                }
                else return Promise.reject({
                    status : 404,
                    msg: "bad request"
                })
            }
        }

        if (queryObject.sort_by && columns.includes(queryObject.sort_by)) {
            sqlString += ` GROUP BY articles.article_id ORDER BY ${queryObject.sort_by}`
        }
        
        else sqlString += ` GROUP BY articles.article_id
        ORDER BY articles.created_at`

        if (queryObject.order){
            if (queryObject.order === "desc"){
                sqlString += ` DESC`
            }
            else if (queryObject.order === "asc"){
                sqlString += ` ASC`
            }
            else return Promise.reject({
                status : 404,
                msg: "bad request"
            })
        }
        else sqlString += ` DESC`

        return db.query(sqlString, queriesArray).then((result) => {
            return result.rows
        })
    }
    
    else {
    let sqlString = 
    `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url,
    COUNT(comments.article_id) ::int AS comment_count
    FROM comments
    right JOIN articles on articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`
    return db.query(sqlString).then((result) => {
        return result.rows
    })
}
}

exports.fetchCommentsById = (id) => {
    const queryValues = []
    queryValues.push(id)
    let sqlString = `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`
    return db.query(sqlString, queryValues)
    .then((result) => {
        return result.rows
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

    return db.query("INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;", [body, author, articleId])
    .then((result) => {
        return result.rows[0]
    })
    
    
}

exports.updateArticleVotesWithId = (id, patchObject) => {
    const articleId = id
    const updateVoteValue = patchObject.inc_votes
    return db.query("UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;", [updateVoteValue, articleId])
    .then((result) => {
        return result.rows[0]
    })
}