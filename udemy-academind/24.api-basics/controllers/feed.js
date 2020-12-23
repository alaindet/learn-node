exports.readPosts = (req, res) => {
  res.status(200).json({
    posts: [
      { title: 'First post', content: 'This is the first post' },
    ]
  });
};

exports.createPost = (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
  };
  res.status(201).json(post);
};
