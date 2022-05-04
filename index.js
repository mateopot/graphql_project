const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs')

const { makeExecutableSchema } = require('graphql-tools')
const { mergeResolvers } = require('@graphql-tools/merge')

const myApp = express();

const typeDefs = fs.readFileSync('./schema/schema.graphql', { encoding: 'utf-8' })
const userTypeDefs = fs.readFileSync('./schema/userSchema.graphql', { encoding : 'utf-8'})
const productTypeDefs = fs.readFileSync('./schema/productSchema.graphql', { encoding : 'utf-8'})

const usersResolver = require('./resolver/usersResolver')
const productsResolver = require('./resolver/productsResolver')
const arrayResolvers = [usersResolver, productsResolver]
const resolvers = mergeResolvers(arrayResolvers)

const schema = makeExecutableSchema({
   typeDefs: [userTypeDefs, productTypeDefs, typeDefs],
   resolvers
});

myApp.use(cors(), bodyParser.json());

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
myApp.use('/graphql', graphqlExpress({ schema }))
myApp.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

myApp.listen(8080, () => {
   console.log('Serveur à l\'écoute')
})