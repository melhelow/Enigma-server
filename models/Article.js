const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    response : {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },

});

const Article = mongoose.model('Article', articleSchema);

module.exports = { Article};
