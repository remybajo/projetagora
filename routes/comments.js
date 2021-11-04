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
        vote: req.body.vote,
        commentaire: req.body.commentaire,
        nb_likes: 0,
        nb_dislikes: 0,
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

  var id;
  router.get('/showComments', async function(req, res, next){
    id = req.query.id;
    var result = false;
    var comments = await commentModel.find({publication_id: id});
    //console.log("selected comment: ", comments)
  
    if(comments){
        result = true
        //console.log("comments result: ",result)
      }

    res.json({result, comments})
})

router.put('/updateLikes/:idComment', async function(req, res, next){
  var comments = await commentModel.find({_id: req.params.idComment});
  console.log("comment liked: ",comments)



  res.json()
})

module.exports = router;