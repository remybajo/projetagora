var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var voteModel = require('../models/votes')
var commentModel = require('../models/comments')

router.post('/sendComment', async function(req, res, next){
    var result = false
    var user = await userModel.findOne({token: req.body.token})
  
    // if(user != null){
      var newComment = new commentModel({
        user_id: user._id,
        publication_id: req.body.publication,
        commentaire: req.body.commentaire,
        //nb_likes: Number,
        date: req.body.date
    })
  
      var commentSave = await newComment.save()
      console.log("check commentSave: ",commentSave)
  
      if(commentSave.vote){
        result = true
      }
    // }
  
    res.json(result)
  })

  router.get('/showComments', async function(req, res, next){
 
    var comments = await commentModel.findOne({publication_id: req.query.id});
    console.log("selected comment: ",comments)
  
    if(comments){
        result = true
      }

    res.json({result, comments})
})

module.exports = router;