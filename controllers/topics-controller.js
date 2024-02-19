const {fetchTopics} = require(`${__dirname}/../models/topics-model`);

exports.getTopics = (req, res, next) => {
    return fetchTopics()
        .then((topics) => {
            res.status(200).send({topics});
    })
    .catch(next);
};



