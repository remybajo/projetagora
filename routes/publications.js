var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var publicationModel = require('../models/publications')
var voteModel = require('../models/votes')
var commentModel = require('../models/comments');
const { isValidObjectId } = require('mongoose');

var id;
var token;

router.get('/lastPublications', async function(req, res, next){
    var result = false;
    var publications = await publicationModel.find().sort({date_publication: -1});
    var latest = publications.slice(0,3)
    console.log("latest: ",latest.length)
  
    if(latest.length == 3){
        result = true

       // console.log(latest)
        console.log("nbre articles: ", latest.length)
      }

    res.json({result, latest})

})


router.get('/selectedPublication', async function(req, res, next){
  var id;
  console.log("req.query ",req.query)
  
  var result = false;
  var result_comments = false
  id = req.query.id;
  console.log("check id: ",id)
  // récupération de l'article correspondant à l'id sélectionné
  var publication = await publicationModel.findById(id);
  var publiToDisplay = publication

  if(publiToDisplay){
    result = true
  };

  // récupération des commentaires sur la publication sélectionnée
  var comments = await commentModel.find({publication_id: id});
  console.log("comments of publication: ", comments)
  if(comments){
    result_comments = true;
    console.log("result_comments: ", result_comments)
  };
  console.log("publication selected: ",publiToDisplay)

  // checker si le user a déjà voté pour cette publication
  var user;
  var votes
  var userConnected = false;
  var alreadyVoted;
  var userVote;
  var alreadyCommented;
  var userComment;
  console.log ("checktoken", req.query.token)
  
  if (req.query.token == null) {
    userConnected = false
  } else {
    userConnected = true;
    token = req.query.token;
    user = await userModel.findOne({token:token})
    votes = await voteModel.find({publication_id: id, user_id:user._id });
    
    if(votes.length == 0){
      alreadyVoted = false
    } else {
      alreadyVoted = true;
      userVote = votes[0].vote;
      console.log("vote du user" , userVote)
    }

    var commented = await commentModel.find({publication_id: id, user_id:user._id });
    console.log("userComment: ", commented );
    if(commented.length ==0) {
      alreadyCommented = false;
    } else {
      alreadyCommented = true;
      userComment = commented[0].commentaire;
      console.log("user comment: ", userComment)
    }

  }
  
  console.log("user connected: ", userConnected)
 

  // récupération du résultat du vote pour l'article sélectionné
  // ATENTION LE MATCH NE FONCTIONNE PAS - pas encore de filtre sur l'id
  
  var stats = await voteModel.aggregate([ 
    //{$match:{publication_id: mongoose.Types.ObjectId("617ebaf5a01b376f21183361")}},
    {$group:{
    _id : "$vote",
     userCount: { $sum: 1 }
   }}
   
  ]);
  
  console.log('stats ', stats)


  res.json({result, publiToDisplay, comments, stats, alreadyVoted, userVote, userConnected, alreadyCommented, userComment})

})

router.delete('/deleteComment', async function(req, res, next){
  id = req.query.id;
  token = req.query.token;
  var user = await userModel.findOne({token:token})

  // suppression du (ou des) commentaires. Il n'y aura qu'un seul commentaire par la suite.
 
  await commentModel.deleteMany({publication_id: id, user_id:user._id });
  console.log("après suppr ",commentModel.find({publication_id: id, user_id:user._id }));
  
  res.json();
})


router.get('/nouveaute', async function(req, res, next){
  id = req.query.id;

  var publication = await publicationModel.findById(id);
  var publiToDisplay = publication

  if(publiToDisplay){
    result = true
  }
  res.json({result, publiToDisplay, id})
}) 

router.post('/upload', async function(req, res, next) {
  console.log('check upload de fichiers: ',req.files.image)
  
  var copyImage = './tmp/'+uniqid()+'.jpg';
  var resultCopy = await req.files.avatar.mv(pictureName);
  // if(!resultCopy) {
  //   var resultCloudinary = await cloudinary.uploader.upload(pictureName);
  //   var url = resultCloudinary.url
  //   console.log("url cloudinary: ", url)
  //   var options = {
  //     json: {
  //       apiKey: "5c0a5d392c1745d2ae84dc0b1483bfd2",
  //       image: url
  //     },
  //    };
    
    
  //   res.json({result: true, message: 'File uploaded!', url: url, gender:gender, age:age});
  // } else {
  //   res.json({error: resultCopy});
  
  //}

  // fs.unlinkSync(pictureName);
  
});

module.exports = router;