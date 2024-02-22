const { fetchAllUsers } = require(`${__dirname}/../models/users-model`)

exports.getUsers = (req, res, next) => {
    fetchAllUsers().then((users) => {
        res.status(200).send({users})
    })
    .catch((err) => {
        next(err)
    })
}