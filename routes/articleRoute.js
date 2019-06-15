const { Article } = require('../models')

module.exports = app => {
    app.get('/articles', (req, res) => {
        Article.find({}, (e, articles) => {
            if (e) throw e
            res.json(articles)
        })
    })
    app.post('/articles', (req, res) => {
        Article.create(req.body, e => {
            if (e) throw e
            res.sendStatus(200)
        })
    })
}