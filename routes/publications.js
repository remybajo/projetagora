var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var publicationModel = require('../models/publications')

router.get('/lastPublications', async function(req, res, next){
 
    var publications = await publicationModel.find().sort({date_publication: -1});
    var latest = publications.slice(0,3)
    console.log(latest)
    console.log("nbre de publications :", latest.length)
    if(latest.length == 3){
        result = true
      }

    res.json({result, latest})

})

module.exports = router;