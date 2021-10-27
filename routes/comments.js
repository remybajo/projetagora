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
        //user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        //publication_id: { type: mongoose.Schema.Types.ObjectId, ref: 'publications' },
        commentaire: req.body.commentaire,
        //nb_likes: Number,
        date: req.body.date
    })
  
      var commentSave = await newComment.save()
  
      if(commentSave.vote){
        result = true
      }
    // }
  
    res.json(result)
  })

module.exports = router;