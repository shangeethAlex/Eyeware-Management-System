import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Display.css";
import { useCart } from "react-use-cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiShoppingBag } from "react-icons/gi";
import ShoppingCart from "../components/ShoppingCart";

function Display() {
  const { addItem, totalUniqueItems, inCart } = useCart();
  const [cartsVisibilty, setCartVisible] = useState(false);
  const [products, setProducts] = useState([]);

  // fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8070/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // call products fetch functon
  useEffect(() => {
    fetchProducts();
  }, []);

  // item add to cart
  const addProductToCart = (product) => {
    product.id = product._id;
    product.price = product.productPrice;

    if (inCart(product.id)) {
      toast.error("Item already in cart.", {
        position: "top-center",
        autoClose: 2000, // Close after 2 seconds
        hideProgressBar: true, // Show a progress bar
        closeOnClick: true, // Close on click
        draggable: true, // Allow dragging to close
      });
    } else {
      toast.success("Item added to cart.", {
        position: "top-center",
        autoClose: 2000, // Close after 2 seconds
        hideProgressBar: true, // Show a progress bar
        closeOnClick: true, // Close on click
        draggable: true, // Allow dragging to close
      });
      addItem(product);
    }
  };

  return (
    <div className="App">
      <br />

      <section>
        <h2 className="title">Available Products</h2>

        <ToastContainer />
        <div className="products">
          {products.map((product) => (
            <div className="product" key={product._id}>
              <img
                className="product-image"
                src={product.productImage}
                alt={product.productName}
              />
              <h4 className="product-name">{product.productName}</h4>

              <p className="product-description">
                {product.productDescription}
              </p>

              <span className="product-price">${product.productPrice}</span>
              <div className="buttons">
                <button
                  className="btn"
                  onClick={() => addProductToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Display;
