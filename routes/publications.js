var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var publicationModel = require('../models/publications')
var voteModel = require('../models/votes')
var commentModel = require('../models/comments');
const mongoose = require('mongoose');


var id;
var token;

var uniqid = require('uniqid');
var fs = require('fs');

var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'dndcvhxbw',
 api_key: '466162484392489',
 api_secret: '-fErMn0jlCeAFf4IiGibqxiEWpY' 
});

router.get('/lastPublications', async function(req, res, next){
    var result = false;
    var publications = await publicationModel.find().sort({date_publication: -1});
    var latest = publications.slice(0,3)
    //console.log("latest: ",latest.length)
  
    if(latest.length == 3){
        result = true

       // console.log(latest)
       // console.log("nbre articles: ", latest.length)
      }

    res.json({result, latest})

})

router.get('/populaires', async function(req, res, next){
  var result = false;
  var rank = await voteModel.aggregate([ 
    {$group:{
      _id : "$publication_id",
       voteCount: { $sum: 1 }
      }},
    {$sort:{ voteCount: -1 }},
    {$limit: 3 }
    ]);

   
  var pop_ids = [];
  var publi;
  for (var i=0; i<rank.length; i++) {
    publi = rank[i]._id;
    publi = publi.toString().replace(/new ObjectId/g, '' );
    pop_ids.push(publi);
  }
 
    var topPublications = [];
    for (var i=0; i<pop_ids.length; i++) {
      top = await publicationModel.findById(pop_ids[i])
      topPublications.push(top)
    } 
    //console.log("top 3 ", topPublications);


  res.json({result, topPublications})

})

router.get('/allPublications', async function(req, res, next){
  var result = false;
  var allPublications = await publicationModel.find().sort({date_publication: -1});
 
  if(allPublications){
      result = true
      // console.log("all: ", allPublications)
    }

    
  res.json({result, allPublications})

})


router.get('/selectedPublication', async function(req, res, next){
  var id;
  console.log("req.query ",req.query)
  
  var result = false;
  var result_comments = false
  id = req.query.id;
  //console.log("check id: ",id)
  // récupération de l'article correspondant à l'id sélectionné
  var publication = await publicationModel.findById(id);
  var publiToDisplay = publication

  if(publiToDisplay){
    result = true
  };

  // récupération des commentaires sur la publication sélectionnée
  var comments = await commentModel.find({publication_id: id}).sort({nb_likes: -1});
  console.log("comments of publication: ", comments)
  if(comments){
    result_comments = true;
    //console.log("result_comments: ", result_comments)
  };
  //console.log("publication selected: ",publiToDisplay)

   

  // checker si le user est connecté et récupérer ses infos
  var user;
  var votes
  var userConnected = false;
  // var alreadyVoted;
  // var userVote;
  // var alreadyCommented;
  // var userComment;

  if (req.query.token != null) {
    userConnected = true;
    user = await userModel.findOne({token: req.query.token});
    console.log("user ", user);
  }
  
  // récup data votes
  votes = await voteModel.find({publication_id: id});
  
  voters = await voteModel.find({publication_id: id}).populate('user_id');
  //console.log("voters: ", voters)

  var gender = [{genre: "hommes", nbre:0}, {genre: "femmes", nbre:0}]
  for(var i=0;i<voters.length;i++){
    if(voters[i].user_id.gender == 'homme'){
      gender[0].nbre++
    } else {
      gender[1].nbre++
    }
  }
 
  console.log("genre: ", gender);
    
  //   if(votes.length == 0){
  //     alreadyVoted = false
  //   } else {
  //     alreadyVoted = true;
  //     userVote = votes[0].vote;
  //     console.log("vote du user" , userVote)
  //   }

  // var commented = await commentModel.find({publication_id: id, user_id:user._id });
  //   console.log("userComment: ", commented );
  //   if(commented.length ==0) {
  //     alreadyCommented = false;
  //   } else {
  //     alreadyCommented = true;
  //     userComment = commented[0].commentaire;
  //     console.log("user comment: ", userComment)
  //   }

  
  console.log("user connected: ", userConnected)

 

  // récupération du résultat du vote pour l'article sélectionné
  // ATENTION LE MATCH NE FONCTIONNE PAS - pas encore de filtre sur l'id
  
  //var stats = await voteModel.find({publication_id: id})
  var stats = await voteModel.aggregate([ 
    {$match:{publication_id: mongoose.Types.ObjectId(id)}},
    {$group:{
    _id : "$vote",
     userCount: { $sum: 1 }
   }}
   
  ]);
  
  //console.log('stats ', stats)

  
  

  //res.json({result, publiToDisplay, comments, stats, alreadyVoted, userVote, userConnected, alreadyCommented, userComment})
  res.json({result, publiToDisplay, comments, stats, userConnected, user, votes, gender})

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
  
  var pictureName = './tmp/'+uniqid()+'.jpg';
  var resultCopy = await req.files.image.mv(pictureName);
  if(!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload(pictureName);
    var url = resultCloudinary.url
    console.log("url cloudinary: ", url)
    var options = {
      json: {
        apiKey: "5c0a5d392c1745d2ae84dc0b1483bfd2",
        image: url
      },
     };
    
    
    res.json({result: true, message: 'File uploaded!', url: url, gender:gender, age:age});
  } else {
    res.json({error: resultCopy});
  
  }

  // fs.unlinkSync(pictureName);
  
});

module.exports = router;