const db = require('../db')
const uuid = require('uuid')

const Query = {
    users: () => db.users.list(),
}

const Mutation = {

    createUser: (root, args, context, info) => {
        const userCreated = {
            id: uuid.v4(),
            firstName: args.firstName,
            lastName: args.lastName,
            role: args.role,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
        }
        db.users.create(userCreated);
        return userCreated
    },

    updateUser: (root, args, context, info) => {
        let userData = db.users.get(args.id)
        db.users.update({
            id: args.id,
            firstName: args.firstName ?? userData.firstName,
            lastName: args.lastName ?? userData.lastName,
            role: args.role ?? userData.role,
            created_at: userData.created_at,
            updated_at: new Date().toLocaleString()
        });
        return db.users.list()
    },

    deleteUser: (root, args, context, info) => {
        db.users.delete(args.id);
        return db.users.list()
    }
}
module.exports = {
    Query,
    Mutation
}