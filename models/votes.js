const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    publication_id: { type: mongoose.Schema.Types.ObjectId, ref: 'publications' },
    vote: String,
    commentaire_id: String ,
    commentaires_likes: Array,
    date_vote: String,

})

const voteModel = mongoose.model('votes', voteSchema);

module.exports = voteModel;