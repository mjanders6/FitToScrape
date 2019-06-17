const { Article } = require('../models')
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = app => {
    app.get('/articles', (req, res) => {
        axios.get('https://www.bodybuilding.com/exercises/finder')
            .then(({ data }) => {
                const $ = cheerio.load(data)
                const bodyBuildArr = []
                $('div.ExResult-cell').each((i, elem) => {
                    if ($(elem).children('h3.ExHeading').children('a').text().trim()) {
                        bodyBuildArr.push({
                            title: $(elem).children('h3.ExHeading').children('a').text().trim(),
                            muscle: $(elem).children('div.ExResult-muscleTargeted').children('a').text().trim(),
                            equipment: $(elem).children('div.ExResult-equipmentType').children('a').text().trim(),
                            link: `https://www.bodybuilding.com/exercises/finder${$(elem).children('h3.ExHeading').children('a').attr('href')}`,
                        })
                    }
                })
                Article.create(bodyBuildArr, e => {
                    if (e) throw e
                    res.sendStatus(200)
                })
                console.log(bodyBuildArr)
            })
            .catch(e => console.log(e))

        // Article.find({}, (e, articles) => {
        //     if (e) throw e
        //     res.json(articles)
        // })
    })
    app.post('/articles', (req, res) => {

        // Article.create(req.body, e => {
        //     if (e) throw e
        //     res.sendStatus(200)
        // })
    })
}