const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Get All
router.get('/',
  function (req, res, next) {
    Post.find().sort({
        id: 1
      })
      .exec(function (err, posts) {
        if (err) {
          res.status(500).json({
            success: false,
            message: err
          });
        } else {
          res.json(posts);
        }
      });
  }
);

// Get one
router.get('/:id',
  function (req, res, next) {
    Post.findOne({
        id: req.params.id
      })
      .exec(function (err, post) {
        if (err) {
          res.status(500).json({
            success: false,
            message: err
          });
        } else if (!post) {
          res.json({
            success: false,
            message: "posting not found"
          });
        } else {
          res.json(post);
        }
      });
  }
);

// Add
router.post('/',
  function (req, res, next) {
    Post.findOne({})
      .sort({
        id: -1
      }) //뒤에 붙이기
      .exec(function (err, post) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err
          });
        } else {
          res.locals.lastId = post ? post.id : 0;
          next();
        }
      });
  },
  function (req, res, next) {
    let newPost = new Post(req.body);
    newPost.id = res.locals.lastId + 1;
    newPost.save(function (err, post) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err
        });
      } else {
        res.json(post);
      }
    });
  }
);

// Update
router.put('/:id',
  function (req, res, next) {
    Post.findOneAndUpdate({
        id: req.params.id
      }, req.body)
      .exec(function (err, post) {
        if (err) {
          res.status(500).json({
            success: false,
            message: err
          });
        } else if (!post) {
          res.json({
            success: false,
            message: "posting not found"
          });
        } else {
          res.json(post);
        }
      });
  }
);

// Delete
router.delete('/:id',
  function (req, res, next) {
    Post.findOneAndRemove({
        id: req.params.id
      })
      .exec(function (err, post) {
        if (err) {
          res.status(500).json({
            success: false,
            message: err
          });
        } else if (!post) {
          res.json({
            success: false,
            message: "posting not found"
          });
        } else {
          res.json(post);
        }
      });
  }
);

module.exports = router;