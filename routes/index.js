var express = require('express');
var router = express.Router();

var uid2 = require('uid2');
var bcrypt = require('bcrypt');
var userModel = require('../models/users')
var publicationModel = require('../models/publications')
var commentModel = require('../models/comments');
const { PromiseProvider } = require('mongoose');


//gestion du sign-in
router.post('/sign-up', async function (req, res, next) {

  var error = []

  var result = false
  var saveUser = null
  var token = null

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if (data != null) {
    error.push('utilisateur déjà présent')
  }

  if (req.body.passwordFromFront !== req.body.passwordVerifFromFront) {
    error.push('Les mots de passes ne correspondent pas')
  }

  if (req.body.usernameFromFront == ''
    || req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('champs vides')
  }


  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10)
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
     
     
    })

    saveUser = await newUser.save()


    if (saveUser) {
      result = true
      token = saveUser.token
    }
  }


  res.json({ result, saveUser, error, token })
})

router.post('/sign-in', async function (req, res, next) {

  var result = false
  var user = null
  var error = []

  var token = null

  if (req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('champs vides')
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      email: req.body.emailFromFront,

    })


    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true
        token = user.token
      } else {
        result = false
        error.push('mot de passe incorrect')
      }

    } else {
      error.push('email incorrect')
    }
  }
 


  res.json({ result, user, error, token })


})

router.post('/post-publication', async function(req, res, next){
  var error = []
  var result = false
  var publiToken = ''
  var savePublication
  var user = await userModel.findOne({token: req.body.token})
  
  var idd = user.id


  console.log('onclick back', req.body)


  if(req.body.titrePublication == ''
  || req.body.contenuPublication == ''
  ){
    error.push('champs vides')
  }

  if(error.length == 0){
    var newPublication = new publicationModel({
      thematique: req.body.themePublication,
      titre: req.body.titrePublication,
      texte: req.body.contenuPublication,
      image: req.body.image,
      date_publication: req.body.datePublication,
      statut: false,
      motsCle: req.body.motClePublication,
      publiToken: uid2(32),
      user_id: idd,
    })
  
    savePublication = await newPublication.save()
 
var id = ''    
    
    if(savePublication){
      result = true
      publiToken = savePublication.publiToken
      id = savePublication.id
    }
  }

  console.log('publiID', id)

    res.json({result, publiToken, id})
  })

  // route qui permet de récupérer les thématiques
  // router.get('/thematique', async function(req, res, next){


  //   res.json({})
  // })

module.exports = router;

// mise à jour du profil
router.post('/addProfil', async function(req, res, next){
  var result = false;
  
var userUpdate = [
  await userModel.updateOne({token : req.body.token}, {gender : req.body.genderFromFront}),
  await userModel.updateOne({token : req.body.token}, {dateOfBirth : req.body.dateOfBirth}),
  await userModel.updateOne({token : req.body.token}, {CSP : req.body.csp}),
  await userModel.updateOne({token : req.body.token}, {civilState : req.body.civilState}),
  await userModel.updateOne({token : req.body.token}, {numberOfcChild: req.body.child})
  
]
  if (userUpdate) {
    result = true
  }
 res.json({result, userUpdate})
 })


// pour publier une publication
// router.post('/publication', async function(req, res, next){
//     res.json({})
//   })

//récupérer les publications
router.get('/publicationdb', async function(req, res, next){

  var publicationTheme = await publicationModel.find({thematique : 'Politique'})

console.log(publicationTheme)


  

  res.json({publicationTheme})
  
 })

// pour retrouver une publication commentée dans le profil
router.get("/commentarticle", async function(req, res, next){
 
var user = await userModel.findOne({token : req.query.token})
if (user) {
var article = await commentModel.find
({user_id : user._id}).populate('publication_id')}
console.log(article.publication_id)

//var publicationComment = await userModel.find()
//console.log(publicationComment)

    res.json({article})
 })

// pour récupérer les données utilisateurs
// router.get('/user', async function(req, res, next){
//     res.json({})
//   })

//pour ajouter un vote sur un publication [SI]
router.post('/addvote', async function (req, res, next) {
  var result = false

  var user = await userModel.findOne({ token: req.body.token })

  if (user) {

    result = true
    token = user.token
  } else {
    result = false
  }
  res.json({ user, token, result })
})

// pour ajouter un commentaire sur un publication [SI]
// router.post('/addcommentaire', async function(req, res, next){
//     res.json({})
//   })

// pour retirer un publication [SI]
// router.delete('/enlevepublication', async function(req, res, next){
//     res.json({})
//   })

// pour retirer un commentaire [SI]
// router.delete('/enlevecom', async function(req, res, next){
//     res.json({})
//   })

// pour changer une info user
// router.update('/changeuser', async function(req, res, next){
//     res.json({})
//   })






module.exports = router;