const db = require('../db')
const uuid = require('uuid')

const Query = {
    products: () => db.products.list(),
}

const Mutation = {

    createProduct: (root, args, context, info) => {
        const productCreated = {
            id: uuid.v4(),
            name: args.name,
            description: args.description,
            reference: args.reference,
            prix: args.prix,
            stock: args.stock,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
        }
        db.products.create(productCreated);
        return productCreated
    },

    updateProduct: (root, args, context, info) => {
        let productData = db.products.get(args.id)
        db.products.update({
            id: args.id,
            name: args.name ?? productData.name,
            description: args.description ?? productData.description,
            reference: args.reference ?? productData.reference,
            prix: args.prix ?? productData.prix,
            stock: args.stock ?? productData.stock,
            created_at: productData.created_at,
            updated_at: new Date().toLocaleString()
        });
        return db.products.list()
    },

    deleteProduct: (root, args, context, info) => {
        db.products.delete(args.id);
        return db.products.list()
    }
}
module.exports = {
    Query,
    Mutation
}