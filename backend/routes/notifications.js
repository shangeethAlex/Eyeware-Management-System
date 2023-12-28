const express = require('express')
const router = express.Router()

const { Notification } = require('../models/notification')

router.get('/open', async (req, res) => {
    const notifications = await Notification.find({ status: 'OPEN' }).populate('supplier product')

    res.send(notifications)
})

router.post('/', async (req, res) => {
    const { supplier, product } = req.body

    let notification = await Notification.findOne({ supplier, product, status: 'OPEN' })
    if (notification) return res.status(409).send({ msg: 'Duplicate notification' })

    notification = new Notification({ supplier, product })
    await notification.save()

    res.send(notification)
})

router.post('/read/:id', async (req, res) => {
    const id = req.params.id

    try {
        const notification = await Notification.findByIdAndUpdate(id, { status: 'READ' }, { new: true })
        res.send(notification)
    } catch (e) {
        return res.status(404).send({ msg: 'Invalid id' })
    }
})

module.exports = router