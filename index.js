const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 2018

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
   })

let StoriesArr=[]

app.get('/stories', (req, res) => res.send(StoriesArr))

app.post('/stories', (req, res) => {
  console.log(req.body)
    StoriesArr.push(req.body)
  res.send(StoriesArr)
})

app.put('/stories', (req, res) => {
  console.log(req.body)
  res.send(`put for ${req.body.name}`)
})

app.delete('/stories', (req, res) => res.send(`delete for ${req.query.name}`))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
