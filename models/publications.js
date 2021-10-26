const mongoose = require('mongoose')

const publicationSchema = mongoose.Schema({
    thematique: String,
    titre: String,
    image: String,
    date_publication: String,
    statut: Boolean,
    auteur: String,
    motsCle: String,

})

const publicationModel = mongoose.model('publications', publicationSchema);

module.exports = publicationModel;