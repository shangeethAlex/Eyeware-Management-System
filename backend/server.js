const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

const errorMiddleware = require("./middleware/errorMiddleware");

require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(errorMiddleware);
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("strictQuery", true);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("🔌 Mongodb Connection success!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on PORT number: ${PORT}`);
});

const salesexecutiveRouter = require("./routes/SalesExecutives.js");
app.use("/salesexecutive", salesexecutiveRouter);

const deliverydriverRouter = require("./routes/DeliveryDrivers.js");
app.use("/deliverydriver", deliverydriverRouter);

const adminRouter = require("./routes/Admin.js");
app.use("/admin", adminRouter);

const loginRouter = require("./routes/Logins.js");
app.use("/login", loginRouter);

const leaveRouter = require("./routes/LeaveApplications.js");
app.use("/leave", leaveRouter);

const supplierRouter = require("./routes/supplier.js");
app.use("/supplier", supplierRouter);

const notifications = require("./routes/notifications");
app.use("/notification", notifications);

const paymentRouter = require("./routes/Payment.js");
app.use("/payment", paymentRouter);

const promotionRouter = require("./routes/Promotion.js");
app.use("/promotion", promotionRouter);

const productRoute = require("./routes/productRoute");
app.use("/api/products", productRoute);

const orderRoutes = require("./routes/orderRoutes");
app.use("/orders", orderRoutes);

const deliveryRouter = require("./controllers/deliveryController.js");
app.use("/", deliveryRouter);
