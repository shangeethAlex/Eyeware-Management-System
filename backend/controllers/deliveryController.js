const express = require("express");
const router = express.Router();
const Delivery = require("../models/delivery");

function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

// Create a new delivery
router.post("/delivery", async (req, res) => {
  try {
    const ref = generateRandomString();
    const delivery = new Delivery({
      orderId: req.body.orderId,
      address: req.body.isShippingAddress
        ? req.body.shippingAddress
        : req.body.address,
      status: req.body.status,
      deliveryDate: req.body.deliveryDate,
      isShippingAddress: req.body.isShippingAddress,
      referenceNumber: ref,
    });
    const savedDelivery = await delivery.save();
    res.status(201).json(savedDelivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all deliveries
router.get("/deliveries", async (req, res) => {
  try {
    const referenceNumber = req.query.referenceNumber;
    const status = req.query.status;

    const referenceNumberRegex = referenceNumber
      ? new RegExp(referenceNumber, "i")
      : null;
    const statusRegex = status !== "all" ? new RegExp(status, "i") : null;

    // Define an empty query object
    const query = {};

    // Add "referenceNumber" and "status" search criteria to the query
    if (referenceNumberRegex) {
      query.referenceNumber = referenceNumberRegex;
    }

    if (statusRegex) {
      query.status = statusRegex;
    }
    console.log("query: ", query);

    // Use the query to search for deliveries
    const deliveries = await Delivery.find(query);
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single delivery by ID
router.get("/delivery/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/delivery/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a delivery by ID
router.put("/delivery/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    delivery.status = req.body.status;
    delivery.address = req.body.isShippingAddress
      ? req.body.shippingAddress
      : req.body.address;
    delivery.deliveryDate = req.body.deliveryDate;
    delivery.isShippingAddress = req.body.isShippingAddress;
    const updatedDelivery = await delivery.save();
    res.json(updatedDelivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a delivery by ID
router.delete("/delivery/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res.json({ message: "Delivery deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/deliveries-search", async (req, res) => {
  try {
    const id = req.query.searchId;
    console.log("id: ", id);
    if (!id) {
      return res
        .status(400)
        .json({ message: "Please provide the 'id' parameter for the search." });
    }
    const idRegex = new RegExp(id, "i"); // 'i' flag for case-insensitive matching

    // Search for deliveries where the "id" field partially matches the provided value
    const deliveries = await Delivery.find({ _id: idRegex });
    console.log("deliveries: ", deliveries);

    if (deliveries.length === 0) {
      return res
        .status(404)
        .json({ message: "No deliveries found for the provided 'id'." });
    }

    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
