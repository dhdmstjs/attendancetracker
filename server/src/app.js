const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
var Post = require("../models/post")

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


// //creates connection with database called posts
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/posts');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});


//opens API endpoint called posts which receives http POST method
//to create a new record for Post model
app.post('/posts', (req, res) => {
  var db = req.db;
  var netid = req.body.netid;
  var name = req.body.name;
  var date = req.body.date;
  var new_post = new Post({
    netid: netid,
    name: name,
    date: date,
  })

  new_post.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Fetch all posts
app.get('/posts', (req, res) => {
  Post.find({}, 'netid name date', function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
})


// Fetch single post
app.get('/post/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'netid name date', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})

// Update a post
app.put('/posts/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'netid name date', function (error, post) {
    if (error) { console.error(error); }
    post.netid = req.body.netid
    post.name = req.body.name
    post.date = req.body.date
    post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a post
app.delete('/posts/:id', (req, res) => {
  var db = req.db;
  Post.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})


//port server is running
app.listen(process.env.PORT || 8081)
