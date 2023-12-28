import React, { useState } from "react";
import { GiShoppingBag } from "react-icons/gi";
import ShoppingCart from "../components/ShoppingCart";
import "./header.css";

function Header() {
  const [cartVisibility, setCartVisible] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <h1 className="logo">LankaOpticals</h1>
        </div>
        <div className="user-menu">
          <div className="user-info">
            <a href="#" className="user-link">
              Ronaldo
            </a>
          </div>
          <button
            className="shopping-cart-button"
            onClick={() => setCartVisible(true)}
          >
            <GiShoppingBag size={24} />
            <span className="product-count">0</span>
          </button>
        </div>
      </div>
      <ShoppingCart
        visibility={cartVisibility}
        onClose={() => setCartVisible(false)}
      />
    </header>
  );
}

export default Header;
