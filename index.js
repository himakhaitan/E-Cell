const path = require('path')
const express = require('express')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb+srv://dbuser:dbuser@cluster0.r9yft.mongodb.net/dbuser?retryWrites=true&w=majority'
const databaseName = 'e-summit'

app.use(express.json())

const thank = path.join(__dirname, './public/thank.html')

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/register' , (req, res) =>{
  MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
      return console.log('Unable to connect to the Database')
    } 
    const db = client.db(databaseName)
  
    db.collection('registerations').insertOne({
      teamname: req.body.teamname,
      email: req.body.email,
      phone: req.body.phone,
      college: req.body.college,
      captainname: req.body.captainname,
      teammemberone: req.body.teammemberone,
      teammembertwo: req.body.teammembertwo,
      teammemberthree: req.body.teammemberthree,
      phonealt: req.body.phonealt
    })
  })
  console.log(req.body)
  res.redirect('/thank')
})

app.get('/thank', (req, res) => {
  res.sendFile(thank)
})

const publicDirectoryPath = path.join(__dirname, './public')

app.use(express.static(publicDirectoryPath))




app.listen(port, () => {
  console.log(`Server started on the port ${port}`)
})