const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: String,
  orderDate: Date,
  orderTotal: Number,
  orderStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Completed", "Cancelled"],
    default: "Pending",
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products", // Reference to the Products collection
      },
      quantity: Number,
    },
  ],
});

const order = mongoose.model("orders", orderSchema);

module.exports = order;
