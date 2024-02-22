const { deleteCommentById } = require(`${__dirname}/../models/comments-model`)

exports.deleteComment = (req, res, next) => {
    const id = req.params.comment_id
    deleteCommentById(id).then((deletedComment) => {
        res.status(204).send({deletedComment})
    })
    .catch((err) =>{
        next(err)
    });
}