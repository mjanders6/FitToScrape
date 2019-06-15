module.exports = (Schema, model) => model('Article', new Schema({
    Headline: String,
    Summary: String,
    URL: String
  }))