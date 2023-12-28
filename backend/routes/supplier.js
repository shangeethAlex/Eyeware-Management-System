const express = require('express')
const router = express.Router()

const { Supplier } = require('../models/supplier')

router.get('/:id', async (req, res) => {
    const id = req.params.id

    const supplier = await Supplier.findById(id)

    res.send(supplier)
})

router.post('/search', async (req, res) => {
    const { email = '' } = req.body

    const regex = new RegExp(email)
    const suppliers = await Supplier.find({ 'email': { $regex: regex, $options: 'i' } })

    res.send(suppliers)
})

router.post('/', async (req, res) => {
    const { company, phone, email, address, name, category } = req.body

    let supplier = await Supplier.findOne({ email })
    if (supplier) return res.status(409).send({ msg: 'Duplicate supplier' })

    supplier = new Supplier({
        company,
        phone,
        email,
        address,
        name,
        category
    })
    await supplier.save()

    res.send(supplier)
})

router.put('/', async (req, res) => {
    const { _id, company, phone, email, address, name, category } = req.body

    let supplier = await Supplier.findById(_id)
    if (!supplier) return res.status(404).send({ msg: 'Supplier not found' })

    supplier.company = company
    supplier.phone = phone
    supplier.email = email
    supplier.address = address
    supplier.name = name
    supplier.category = category

    await supplier.save()

    res.send(supplier)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const supplier = await Supplier.findByIdAndDelete(id)

    res.send(supplier)
})

module.exports = router