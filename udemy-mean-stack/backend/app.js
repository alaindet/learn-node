const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/v1/posts', (request, response) => {
  const posts = [
    {
      id: 'dsa131035qw',
      title: 'First post',
      content: 'This is my first post',
    },
    {
      id: 'qhe873021vf',
      title: 'Second post',
      content: 'This is my second post',
    },
  ];
  response.status(200).json({
    message: 'Posts fetched successfully',
    data: posts,
  });
});

app.post('/api/v1/posts', (request, response) => {
  console.log('Posted post', request.body);
  response.status(201).json({
    message: 'Post created successfully',
    data: null,
  });
});

module.exports = app;
