const mongoose = require('mongoose')

const Notification = mongoose.model('Notification', new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    status: {
        type: String,
        enum: ['OPEN', 'READ'],
        default: 'OPEN'
    }
}))

exports.Notification = Notification