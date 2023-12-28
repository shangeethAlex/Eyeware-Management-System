import React, { useEffect, useState } from "react";
import "./shoppingCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart } from "react-use-cart";
import axios from "axios";
import Swal from "sweetalert2";

function ShoppingCart(props) {
  const [orderStatus, setOrderStatus] = useState("");
  const { visibilty, onClose } = props;

  const { items, updateItemQuantity, removeItem, totalUniqueItems, cartTotal } =
    useCart();

  // cart item quntity change
  const onQuantityChange = (productId, count) => {
    updateItemQuantity(productId, count);
  };

  // cart item remove
  const onProductRemove = (product) => {
    removeItem(product.id);
  };

  const placeOrder = async () => {
    // Prepare the order data according to orderSchema
    const orderData = {
      customerId: "Haris",
      orderDate: new Date(),
      orderItems: items,
      orderTotal: cartTotal.toFixed(2),
    };
    console.log(orderData.products);

    try {
      // Send a POST request to your server's API endpoint
      const response = await axios.post(
        "http://localhost:8070/orders",
        orderData
      );

      // Handle the response from the server
      window.location.href = `/checkout/${orderData.orderTotal}`;
      if (response.status === 201) {
        items.forEach((product) => {
          removeItem(product._id);
        });
        // Order placed successfully
        setOrderStatus("Order placed successfully!");

        // checkout(); // Clear the cart
        // navigate("/");

        // Swal.fire({
        //   title: "Order placed successfully!",
        //   icon: "success",
        // });
      } else {
        // Handle other response statuses (e.g., validation errors)
        setOrderStatus("Order failed. Please try again.");
      }
    } catch (error) {
      // Handle network errors or server errors
      setOrderStatus("Order failed. Please try again later.");
      console.error("Error placing order:", error);
    }
  };

  return (
    <div
      className="modal"
      style={{
        display: visibilty ? "block" : "none",
      }}
    >
      <div className="shoppingCart">
        <div className="header">
          <h2>Shopping cart</h2>
          <button className="btn close-btn" onClick={onClose}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className="cart-products">
          {items.length === 0 && (
            <span className="empty-text">Your Cart is currently empty</span>
          )}
          {items.map((product) => (
            <div className="cart-product" key={product._id}>
              <img src={product.productImage} alt={product.productName} />
              <div className="product-info">
                <h3>{product.productName}</h3>
                <span className="product-price">
                  {product.itemTotal.toFixed(2)}$
                </span>
              </div>
              <select
                className="count"
                value={product.quantity}
                onChange={(event) => {
                  onQuantityChange(product._id, event.target.value);
                }}
              >
                {[...Array(10).keys()].map((number) => {
                  const num = number + 1;
                  return (
                    <option value={num} key={num}>
                      {num}
                    </option>
                  );
                })}
              </select>
              <button
                className="btn remove-btn"
                onClick={() => onProductRemove(product)}
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          ))}
          {items.length > 0 && (
            <div
              className="cart-product"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "500px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Total Products</div>
                  <div>{totalUniqueItems}</div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Total Amount</div>
                  <div>{cartTotal.toFixed(2)}$</div>
                </div>
                <button
                  className="btn checkout-btn"
                  onClick={() => placeOrder()}
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
