const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        
    }

    type Article {
        _id: ID
        username: String
        title: String
        prompt: String
        response: String
        date: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
    getUser(username: String!): User
    getAllUsers: [User]
    getSavedArticles(username: String!): [Article]
    getArticle(_id: ID!): Article
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveArticle(username: String!, title: String!, prompt: String!, response: String!, date: String!): Article
        removeArticle(username: String!, _id: ID!): User
    }
`;

module.exports = typeDefs;
