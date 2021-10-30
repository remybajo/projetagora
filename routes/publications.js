var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var publicationModel = require('../models/publications')


router.get('/lastPublications', async function(req, res, next){
 
    var publications = await publicationModel.find().sort({date_publication: -1});
    var latest = publications.slice(0,3)
  
    if(latest.length == 3){
        result = true

        console.log(latest)
      }

    res.json({result, latest})

})


router.get('/selectedPublication', async function(req, res, next){
  var id;
  console.log("req.query ",req.query)
  id = req.query.id;
  console.log("check id: ",id)

  var publication = await publicationModel.findById(id);
  var publiToDisplay = publication

  if(publiToDisplay){
    result = true
  }

  console.log("publication selected: ",publiToDisplay)

  res.json({result, publiToDisplay, id})

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

module.exports = router;