var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var voteModel = require('../models/votes')

router.post('/sendVote', async function(req, res, next){
    var result = false
    var user = await userModel.findOne({token: req.body.token})
  
    // if(user != null){
      var newVote = new voteModel({
        //user_id: user._id,
        // -bpublication_id: req.body.publication,
        vote: req.body.vote,
        date_vote: req.body.date
      })
  
      var voteSave = await newVote.save()
  
      if(voteSave.vote){
        result = true
      }
    // }
  
    res.json(result)
  })

module.exports = router;