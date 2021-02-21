const express = require('express');
const bodyParser= require('body-parser')
//Body parser is middleware used to tidy up form requests into JSON format.that's how we include it in our code
const app = express(); //methods for calling express in the code

const MongoClient = require('mongodb').MongoClient //includes mongo DB
app.set('view engine', 'ejs') //Tells express that we're using EJS as our html engine


MongoClient.connect('mongodb+srv://admin:9QtLDmAVVmWyVYj@cluster0.zwozr.mongodb.net/<dbname>?retryWrites=true&w=majority', {useUnifiedTopology: true})
.then(client =>{
    console.log('DATABASE CONNECTED SUCCESFULLY!')
    
    const db = client.db('Todo-list')
    const quotesCollection = db.collection('quotes')
    
    app.use(bodyParser.urlencoded({extended:true})) //app.use method lets us use the middleware
    //The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.
    
    app.use(express.static('public'))
    app.use(bodyParser.json())

    
    app.get('/', (req, res) =>{
        
      db.collection('quotes').find().toArray()
        .then()    
        .catch()
        console.log('READ OPERATION')

      db.collection('quotes').find().toArray()
          .then(results => {
            res.render('index.ejs', { quotes: results })
          })
          .catch()



      db.collection('quotes').find().toArray()
          .then(results =>{
            console.log(results)
          })
          .catch(error => console.error(error))
    })

    app.post('/quotes', (req,res) =>{
        quotesCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    
    
     app.listen(3000, function(){
        console.log('Listening on 3000') //defines which port to listen on,in this case it's 3000 and executes the code between braces.
    })

    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
      .then(result => {res.json('sucess')})
      .catch(error => console.error(error))
    })
    app.delete('/quotes', (req, res) => {
      console.log('handler test')
      quotesCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            console.log('3and el if')
            return res.json('No quote to delete')
          }
          res.json('Deleted Darth Vadar\'s quote')
        })
        .catch(error => console.error(error))
    })
})
.catch(error => console.error(error))

