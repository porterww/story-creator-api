const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const cors = require('cors')
const {OAuth2Client} = require ('google-auth-library')
const bodyParser = require('body-parser')
const app = express()
const port = 2018
const monk = require('monk')
const db = monk(
  'mongodb://admin:L3tSMak3A$t0rY!1337!@ds030827.mlab.com:30827/story-creator-app'
)
const StoriesCollection = db.get('stories')
const client = new OAuth2Client('638427942108-gu6aaiirubndb0njlojqqanocgjfa3ao.apps.googleusercontent.com')
const Joi = require('joi')

app.use(bodyParser.json())
// app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

// let StoriesArr=[]

app.get('/stories', async (req, res) => {
  // res.json({ msg: 'This is CORS-enabled for all origins!' })
  try {
    const StoriesArr = await StoriesCollection.find({})
    // console.log(StoriesArr)
    res.send(StoriesArr)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})
app.post('/stories', async (req, res) => {
  // console.log(req.body)
  const results = Joi.validate(req.body, schema)
  // result.error === null -> valid
  if (results.error) res.send(results.error)
  else {
    try {
      await StoriesCollection.insert(req.body)
      const StoriesArr = await StoriesCollection.find({})
      res.send(StoriesArr)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }
})

const privateKey = "MIIEpAIBAAKCAQEA0BIvWGo70TrrxFFguCI5/CU6Tz4rVjnL8FNUmn3sej4mjmbY"+
"EuIkaUvSmwx/AqVgeGyly/Jxb/3NwpoHV7m1TgsAtrrg+vtw/JbcFoos+YLeIfR8"+
"060J6AIyL5C86JXWhl87y0iMed4trviwWZIBCuOZuC7ZRorhdAYgaAei85IbUxrA"+
"GBaRQKPWwSLxGolrACN3h064FvADPjQnbERM+5pwOLYfxA5OpO2FjZ/rECjZstc2"+
"+BqoMfaq2oeQx6K8C8BZt07KsCS8f1/0fLtGwC2Q06QvJxqWiuRzlb0Vf+YiVuJM"+
"3jzlBL5TiMyLzzpHJZnujoFkUhkb8dWC50kqiQIDAQABAoIBAQCjkagmmVzs3qT5"+
"b//YwQ9UaO+t2/G1lzn7c4bO7K86aiFlUPQL5Ds7i5/Ew84VBm0QPlkYOz9yCtP2"+
"Z5/eFt+wunWVMNQsef4Yk3/xOC6i934os0puHVnsSc2qFt5q+V/rwnH/HMlSBJdl"+
"NZtszpqDNOljIXEtQ4B49VgEb/xp/MWoFPYbfj9N/eH8y9h7iQ7QWX4hqk4pIvxQ"+
"jcoWJXGi8TocW+DbZ0gKFLzUq3fMLxx9qAVHtn+PdzHc8z0qLUElARWoliUd6CMl"+
"/9NzJVrbAV3X6Do4qIRVPmVj6baiEJznBGPI35Ng9WeQRFGNMCMPE4kA8j2+0u21"+
"eDFX8BQBAoGBAPx+/+5EOqOsLUlyPIQAf9gLmyS5AiIHg6g8jB8khgs6kAphEH/5"+
"oUMNnEwRrj/OavHfbRJqyWS/AhRSvniZhAZ+E+YMj2i3Y0vhpEu6DGFj65IJNeRf"+
"uRm/o46Pa63gMR3gIxBwvOTl3TvTGgOkV+lTpQl4s7nxMDZx8QhI6bDdAoGBANL1"+
"XSJcqYyGfAmtcKflt3m0utDDSSsciRvIrpQG81OFZii3ax+sz3P4zdnf6u3DTCxL"+
"SGs7SoyP8MPn9XyGongWFwMzl+GN1mxpZ7yKv65XqlbBLaU/vCLOvPI18d6AgYEq"+
"k51bCeCifiX9/HX0LX7luFpUebd9xBqQ4HhP+c+dAoGBANdFY+h9jU0sJ3Q+DDAy"+
"yMymoIA/p/zhUTNnY8PNfOcn59ShitLBPucPPJlyXZCS6YUMC08vckMNwrUXEsN5"+
"hyGN7mMthDswV11DpLLXjWSfLyHT7nmlzweP5t9Nke2tfdLN3LdQlwvEmsk9oylF"+
"vZn1sXiQyxKV+pgArxJ0L6GVAoGAE6roefGlpQJMwiI3ZI/YITKmUBxE0A4jAkId"+
"dJOJT/oZ4iXniNZ1qNxDZNKpdm1ExsRmBglLE/u/eKRBkNCEiSmWD6hZup+cpBLX"+
"pw5QfJKTwO7VsJhWk/AuUW6SFCpq6H3tsTfxnc3IcQZS6TRQoYoNO+6wQlkpVUi4"+
"hL8ADUkCgYBSj8c1YXIM3VGX3q5Wotv5qjo+pndAtjWTsXWJnSnwoAF3QWfE/aQx"+
"gUGzKkUkNH6FJ5IZHFuCYFUYPbxPvh/kOuAPKSgC5zm53o5I0SlTxhITIt7KdOT7"+
"nlrpqNSzglYHkh/zfuA8M9byttJ2hy7adoRta7FfhhEL4ZuvJcvBqw=="

app.post('/OAuth/google', async (req, res) => {
  // const results = Joi.validate(req.body, schema)
  // result.error === null -> valid
  console.log(req.body)
      client.verifyIdToken({
        idToken: req.body.id,
        audience: '638427942108-gu6aaiirubndb0njlojqqanocgjfa3ao.apps.googleusercontent.com'
      })
      .catch(err => {
        console.log(err.message)
      })
      .then(ticket => {
        const payload = ticket.getPayload()
        const userId = payload ['sub']
        let token = jwt.sign({
          id: userId,
          username: payload.name,
          aud: payload.aud,

        },
        privateKey, 
        {
          algorithm: "HS256",
          issuer: "Story Creator App",
          expiresIn: "3h"
        }
        )
        res.send(JSON.stringify(token))
      })
})



app.put('/stories', (req, res) => {
  StoriesCollection.update({ _id: req.body._id }, { $set: req.body })
    .then(e => console.log(e))
    .catch(e => console.log(e))
  res.send(req.body)
})

app.delete(`/stories-delete/:_id`, async (req,res)=> {
  StoriesCollection.remove(req.params._id)
      res.send('success')
    })

app.listen(port, () =>
  console.log(
    `Story Creator API listening on port ${port}!`
  )
)
//Line below are for Joi functions
const schema = Joi.object().keys({
  title: Joi.string()
    .regex(/^[a-zA-Z0-9 ]{1,45}$/)
    .required()
    .label(
      'Story Title field requires at least 3 characters, max 45. No Symbols'
    ),
  author: Joi.string()
    .regex(/^[a-zA-Z ]{1,30}$/)
    .required()
    .label('Author field requires at least 3 characters, max 30. No Symbols.'),
  genre: Joi.string()
    .regex(/^[a-zA-Z ]{3,30}$/)
    .required()
    .label('Genre field requires at least 3 characters, max 30. No Symbols.'),
  story: Joi.string().required()
})
