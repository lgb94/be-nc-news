const db = require(`${__dirname}/../db/connection`)

exports.deleteCommentById = (id) => {
    const commentId = id
    return db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [commentId])
        .then((result) => {
            if (result.rows.length === 0){
                return Promise.reject({
                    status : 404,
                    msg: "bad request"
                })
            }
            else return result.rows[0]
        })
}