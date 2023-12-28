const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orderController");

router.get("/", ordersController.fetchOrders);
router.get("/order/:id", ordersController.fetchOrder);
router.get("/:customerId", ordersController.fetchCustomerOrders);
router.post("/", ordersController.createOrder);
router.put("/:id", ordersController.updateOrder);
router.delete("/:id", ordersController.deleteOrder);

module.exports = router;
