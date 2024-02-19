const db = require(`${__dirname}/../db/connection`)

exports.fetchTopics = () => {
    let sqlString = `SELECT * FROM topics`
    return db.query(sqlString).then((result) => {
        return result.rows
    })
}