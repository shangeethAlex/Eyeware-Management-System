import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import "../styles/ProductForm.css";
import { Link } from "react-router-dom";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [supplier, setSupplier] = useState("");

  const [suppliers, setSuppliers] = useState([]);

  const [formErrors, setFormErrors] = useState({
    productName: "",
    productDescription: "",
    productType: "",
    productQuantity: "",
    productPrice: "",
    productImage: "",
  });

  useEffect(() => {
    axios
      .post("http://localhost:8070/supplier/search", {})
      .then((resp) => setSuppliers(resp.data));
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };

    if (!productName.trim() || productName.length < 5) {
      newErrors.productName =
        "Product Name is required and must be at least 5 characters long.";
      isValid = false;
    } else if (!/^[A-Za-z\s]*$/.test(productName)) {
      newErrors.productName =
        "Product Name must contain only letters and spaces.";
      isValid = false;
    } else {
      newErrors.productName = "";
    }

    if (!productDescription.trim() || productDescription.length < 10) {
      newErrors.productDescription =
        "Product Description is required and must be at least 10 characters long.";
      isValid = false;
    } else {
      newErrors.productDescription = "";
    }

    if (!productType.trim()) {
      newErrors.productType = "Product Type is required.";
      isValid = false;
    } else {
      newErrors.productType = "";
    }

    if (!productQuantity || isNaN(productQuantity) || productQuantity < 0) {
      newErrors.productQuantity =
        "Product Quantity must be a non-negative number.";
      isValid = false;
    } else {
      newErrors.productQuantity = "";
    }

    if (!productPrice || isNaN(productPrice) || productPrice <= 0) {
      newErrors.productPrice = "Product Price must be a positive number.";
      isValid = false;
    } else {
      newErrors.productPrice = "";
    }

    if (!productImage.trim()) {
      newErrors.productImage = "Product Image URL is required.";
      isValid = false;
    } else {
      newErrors.productImage = "";
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const createProduct = () => {
    if (validateForm()) {
      axios
        .post("http://localhost:8070/api/products", {
          productName,
          productDescription,
          productType,
          productQuantity,
          productPrice,
          productImage,
          supplier,
        })
        .then((response) => {
          alert("Successfully Created");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to create the product.");
        });
    } else {
      alert("Please fill in all the required fields correctly.");
    }
  };

  return (
    <div>
      <h1 className="product-form-title">Add Product</h1>
      <Link className="back" to="/adhome">
        Back to Home
      </Link>
      <Link className="back" to="/ViewProducts">
        Back to Products
      </Link>
      <div className="product-form">
        <div className="image-container">
          <img
            src="https://images.unsplash.com/photo-1552337557-45792b252a2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
            alt="Product"
            className="product-image"
          />
        </div>
        <div className="input-container">
          <label>Product Name</label>
          <input
            type="text"
            onKeyPress={(e) => {
              if (e.key.match(/[0-9]/)) {
                e.preventDefault();
              }
            }}
            onChange={(event) => {
              setProductName(event.target.value);
            }}
            style={{ borderColor: formErrors.productName ? "red" : "" }}
          />
          <div className="error">{formErrors.productName}</div>
          <label>Product Description</label>
          <input
            type="text"
            onKeyPress={(e) => {
              if (e.key.match(/[0-9]/)) {
                e.preventDefault();
              }
            }}
            onChange={(event) => {
              setProductDescription(event.target.value);
            }}
            style={{ borderColor: formErrors.productDescription ? "red" : "" }}
          />
          <div className="error">{formErrors.productDescription}</div>
          <label>Product Type</label>
          <input
            type="text"
            onKeyPress={(e) => {
              if (e.key.match(/[0-9]/)) {
                e.preventDefault();
              }
            }}
            onChange={(event) => {
              setProductType(event.target.value);
            }}
            style={{ borderColor: formErrors.productType ? "red" : "" }}
          />
          <div className="error">{formErrors.productType}</div>
          <label>Product Quantity</label>
          <input
            type="number"
            onChange={(event) => {
              setProductQuantity(event.target.value);
            }}
            style={{ borderColor: formErrors.productQuantity ? "red" : "" }}
          />
          <div className="error">{formErrors.productQuantity}</div>
          <label>Product Price</label>
          <input
            type="number"
            onChange={(event) => {
              setProductPrice(event.target.value);
            }}
            style={{ borderColor: formErrors.productPrice ? "red" : "" }}
          />
          <div className="error">{formErrors.productPrice}</div>
          <label>Product Image URL</label>
          <input
            type="text"
            onChange={(event) => {
              setProductImage(event.target.value);
            }}
            style={{ borderColor: formErrors.productImage ? "red" : "" }}
          />
          <div className="error">{formErrors.productImage}</div>
          <label>Supplier</label>
          <select
            className="form-select"
            style={{ width: "70%" }}
            onChange={(ev) => setSupplier(ev.target.value)}
          >
            <option selected>Select Supplier</option>
            {suppliers.map((supplier) => {
              return <option value={supplier._id}>{supplier.name}</option>;
            })}
          </select>
          <br /> <br />
          <button onClick={createProduct}>Add Product</button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
