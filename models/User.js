const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    // This is the array of the user's saved articles
    savedArticles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
    }],
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.virtual('numSavedArticles').get(function () {
    return this.savedArticles.length;
}
);

const User = mongoose.model('User', userSchema);

module.exports = {User};

