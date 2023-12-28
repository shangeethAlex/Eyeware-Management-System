const mongoose = require('mongoose')

const Supplier = mongoose.model('Supplier', new mongoose.Schema({
    name: String,
    company: String,
    category: String, // GLASSES, SUN_GLASSES, LENS
    phone: String,
    email: String,
    address: String
}))

exports.Supplier = Supplier