// Create web server

// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

// Create express app
const app = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/comments');

// Middleware
app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
  Comment.find({})
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
});

// POST /comments
app.post('/comments', (req, res) => {
  const comment = new Comment({
    text: req.body.text,
  });
  comment.save()
    .then(() => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, {
    text: req.body.text,
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id)
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});