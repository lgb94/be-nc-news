const db = require(`${__dirname}/../db/connection`)

exports.fetchArticles = (id) => {

let sqlString = `SELECT * FROM articles`
const queryValues = []
if (id){
        sqlString += ` WHERE article_id = $1`
        queryValues.push(id)
    }
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