const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        productDescription: {
            type: String,
            required: true,
        },
        productType: {
            type: String,
            required: true,
        },
        productQuantity: {
            type: Number,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productImage: {
            type: String,
            required: true,
        },
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier'
        }
    },
    { timestamps: true }
)

const ProductModel = mongoose.model('Product', ProductSchema)
module.exports = ProductModel
