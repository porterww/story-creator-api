const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 2018
const monk = require('monk')
const db = monk(
  'mongodb://admin:L3tSMak3A$t0rY!1337!@ds030827.mlab.com:30827/story-creator-app'
)
const StoriesCollection = db.get('stories')
const Joi = require('joi')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
   })

// let StoriesArr=[]

app.get('/stories', async (req, res) => {
  try {
    const StoriesArr = await StoriesCollection.find({})
    res.send(StoriesArr)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

app.post('/stories', async (req, res) => {
  const results = Joi.validate( req.body, schema)
  // result.error === null -> valid
  if (results.error)
  res.send(results.error)
  else {
    try {
      await StoriesCollection.insert(req.body)
      const StoriesArr = await StoriesCollection.find({})
      res.send(StoriesArr)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }})

app.put('/stories', (req, res) => {
        StoriesCollection.update({_id: req.body._id}, {$set: req.body}).then(
         (e) => console.log(e)
       ) .catch(e=>console.log(e)) 
       res.send(req.body)
})

app.delete('/stories', (req, res) => res.send(`delete for ${req.query.name}`))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//Line below are for Joi functions
const schema = Joi.object().keys({
  title: Joi.string().regex(/^[a-zA-Z0-9 ]{1,45}$/).required().label('Story Title field requires at least 3 characters, max 45. No Symbols'),
  author: Joi.string().regex(/^[a-zA-Z ]{1,30}$/).required().label('Author field requires at least 3 characters, max 30. No Symbols.'),
  genre: Joi.string().regex(/^[a-zA-Z ]{3,30}$/).required().label('Genre field requires at least 3 characters, max 30. No Symbols.'),
  story: Joi.string().required()
})
