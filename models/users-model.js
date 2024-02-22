const db = require(`${__dirname}/../db/connection`)

exports.fetchAllUsers = () => {
    return db.query('SELECT * FROM users')
    .then((result) => {
        return result.rows
    })
}