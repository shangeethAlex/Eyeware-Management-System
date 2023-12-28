import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/ProductUpdate.css";

function ProductUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    productName: "",
    productDescription: "",
    productQuantity: "",
    productType: "",
    productPrice: "",
    productImage: "",
  });

  const [errors, setErrors] = useState({
    productName: "",
    productDescription: "",
    productQuantity: "",
    productType: "",
    productPrice: "",
    productImage: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8070/api/products/${id}`)
      .then((response) => {
        setValues(response.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!values.productName.trim() || values.length < 5) {
      newErrors.productName =
        "Product Name is required and must be at least 5 characters long.";
      isValid = false;
    }

    if (!values.productDescription.trim() || values.length < 10) {
      newErrors.productDescription =
        "Product Description is required and must be at least 10 characters long.";
      isValid = false;
    }

    if (
      !values.productQuantity ||
      isNaN(values.productQuantity) ||
      values.productQuantity < 0
    ) {
      newErrors.productQuantity =
        "Product Quantity must be a non-negative number.";
      isValid = false;
    }

    if (!values.productType.trim()) {
      newErrors.productType = "Product Type is required.";
      isValid = false;
    }

    if (
      !values.productPrice ||
      isNaN(values.productPrice) ||
      values.productPrice <= 0
    ) {
      newErrors.productPrice = "Product Price must be a positive number.";
      isValid = false;
    }

    if (!values.productImage) {
      newErrors.productImage = "Product Image is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .put(`http://localhost:8070/api/products/${id}`, values)
        .then((response) => {
          alert("Product updated successfully.");
          navigate("/ViewProducts");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <div className="update-container">
        <h1>Update Product Details</h1>
        <div className="product-update-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={values.productName}
              onKeyPress={(e) => {
                if (e.key.match(/[0-9]/)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) =>
                setValues({ ...values, productName: e.target.value })
              }
            />
            <div className="error">{errors.productName}</div>

            <label htmlFor="productDescription">Product Description:</label>
            <input
              type="text"
              id="productDescription"
              name="productDescription"
              value={values.productDescription}
              onKeyPress={(e) => {
                if (e.key.match(/[0-9]/)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) =>
                setValues({ ...values, productDescription: e.target.value })
              }
            />
            <div className="error">{errors.productDescription}</div>

            <label htmlFor="productQuantity">Product Quantity:</label>
            <input
              type="number"
              id="productQuantity"
              name="productQuantity"
              value={values.productQuantity}
              onChange={(e) =>
                setValues({ ...values, productQuantity: e.target.value })
              }
            />
            <div className="error">{errors.productQuantity}</div>

            <label htmlFor="productType">Product Type:</label>
            <input
              type="text"
              id="productType"
              name="productType"
              value={values.productType}
              onKeyPress={(e) => {
                if (e.key.match(/[0-9]/)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) =>
                setValues({ ...values, productType: e.target.value })
              }
            />
            <div className="error">{errors.productType}</div>

            <label htmlFor="productPrice">Product Price:</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={values.productPrice}
              onChange={(e) =>
                setValues({ ...values, productPrice: e.target.value })
              }
            />
            <div className="error">{errors.productPrice}</div>

            <label htmlFor="productImage">Product Image:</label>
            <input
              type="text"
              id="productImage"
              name="productImage"
              value={values.productImage}
              onKeyPress={(e) => {
                if (e.key.match(/[0-9]/)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) =>
                setValues({ ...values, productImage: e.target.value })
              }
            />
            <div className="error">{errors.productImage}</div>

            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;
