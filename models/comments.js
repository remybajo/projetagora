const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    publication_id: { type: mongoose.Schema.Types.ObjectId, ref: 'publications' },
    commentaire: String,
    nb_likes: Number,
    date: String
})

const commentModel = mongoose.model('comments', commentSchema);

module.exports = commentModel;