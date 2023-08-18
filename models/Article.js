const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
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
        required: true,
    },

});

const Article = mongoose.model('Article', articleSchema);

module.exports = { Article};
