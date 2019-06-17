module.exports = (Schema, model) => model('Article', new Schema({
    title: String,
    muscle: String,
    equipment: String,
    link: String
  }))