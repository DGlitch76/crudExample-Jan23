const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const expressLayouts = require('express-ejs-layouts')
const Recipe = require('./models/Recipe.model')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(expressLayouts)

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find()
  console.log(recipes)
  res.render('recipes/all', { recipes })
})

app.get('/recipes/new', (req, res) => {
  res.render('recipes/new')
})

app.post('/recipes/new', async (req, res) => {
  // Only in POST methods (req.body)
  console.log(req.body)
  /* Recipe.create({ ...req.body, ingredients: req.body.ingredients.split(' ') }).then(newRecipe => {
    res.redirect(`/recipes/${newRecipe._id}`)
  }).catch((error) => { console.log(error) }) */
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      ingredients: req.body.ingredients.split(' '),
    })
    res.redirect(`/recipes/${newRecipe._id}`)
  } catch (error) {
    console.log(error)
  }
})

app.get('/recipes/:recipeId', async (req, res) => {
  console.log(req.params)
  const foundRecipe = await Recipe.findById(req.params.recipeId)
  console.log(foundRecipe)

  res.render('recipes/one', foundRecipe)
})

// /search?key=value&key2=value
app.get('/search', (req, res) => {
  console.log(req.query)
  const ourQueries = req.query

  res.render('search', req.query)
})

mongoose
  .connect('mongodb://localhost:27017/crudexample')
  .then(() => {
    console.log('Connected to the DB')
    app.listen(3000, () => {
      console.log('Listening on port 3000')
    })
  })
  .catch(error => {
    console.log(error)
  })
