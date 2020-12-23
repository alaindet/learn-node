const { validationResult } = require('express-validator/check');

exports.readPosts = (req, res) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First post',
        content: 'This is the first post',
        imageUrl: 'images/duck',
        creator: {
          name: 'Alain'
        },
        createdAt: new Date(),
      },
    ]
  });
};

exports.createPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed'
    });
  }
  res.status(201).json({
    message: 'Post created successfully',
    post: {
      _id: '1',
      title: req.body.title,
      content: req.body.content,
      creator: {
        name: 'Alain',
      },
      createAt: new Date(),
    }
  });
};
