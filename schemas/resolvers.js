const { AuthenticationError } = require("apollo-server-express");
const { User, Article} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        getAllUsers : async () => {
            return User.find();
        },
        getUser: async (parent, args) => {
            return await User.findById(args.id);
        },
        getSavedArticles: async (_, { username }) => {
            const articles = await Article.find( {username} );
            return articles;
        },
        getArticle: async (parent, args) => {
            return await Article.findById(args.id);
        },
    },
    Mutation: {
        addUser: async (parent, { username , email , password}) => {
            console.log({
                username,
                email,
                password,

            })

            const user = await User.create({
                username,
                email,
                password,
            });

            console.log(user);
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne ({ email});

            if (!user) {
                throw new AuthenticationError("No profile with this email found!");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect password!");
            }

            const token = signToken(user);
            return { token, user };
        },

        saveArticle : async (__, { username, prompt, response, date }) => {
            const article = await Article.create({ username, prompt, response, date });
            const token = signToken(article);
            return article ;
        },

        removeArticle: async (parent, { _id }, context ) => {
            if (context.user) {
                const article = await Article.findOneAndRemove( { _id, username: context.user.username });
                return article;
            }
            else {
                throw new AuthenticationError("You need to be logged in!");
            }
        },
    },
};





module.exports = resolvers;