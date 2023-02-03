const { Schema, model } = require('mongoose')

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
})

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe
