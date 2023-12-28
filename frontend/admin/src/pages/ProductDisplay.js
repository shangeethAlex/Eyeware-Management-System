import React, { useEffect, useState } from "react";
import axios from "axios";
import get from "lodash.get";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../styles/ProductDisplay.css";
import { Link } from "react-router-dom";

function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8070/api/products");
        console.log("log response", response);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (shouldDelete) {
      axios
        .delete(`http://localhost:8070/api/products/${id}`)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleNotifySupplier = (productId, supplierId) => {
    if (!productId || !supplierId) {
      return alert("Cannot notify this product");
    }

    axios
      .post("http://localhost:8070/notification", {
        product: productId,
        supplier: supplierId,
      })
      .then(() => alert("Notification sent to Supplier Manager"))
      .catch((err) =>
        alert(get(err, "response.data.msg", "Notification failed"))
      );
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 78);
    doc.text("LANKA OPTICALS", 105, 15, "center");
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text("PRODUCT REPORT", 105, 25, "center");
    doc.setFontSize(10);
    doc.setLineWidth(0.5);
    doc.line(10, 30, 200, 30);
    const tableStartY = 40;
    doc.autoTable({
      startY: tableStartY,
      head: [
        [
          "No",
          "Product Name",
          "Description",
          "Quantity",
          "Type",
          "Supplier",
          "Price",
        ],
      ],
      body: products.map((product, index) => [
        index + 1,
        product.productName,
        product.productDescription,
        product.productQuantity,
        product.productType,
        get(product, "supplier.name"),
        `$${product.productPrice}`,
      ]),
    });

    doc.save("Product_Report.pdf");
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <br />
      <Link className="back" to="/adhome">
        Back to Home
      </Link>
      <br />
      <h1 id="heading">Available Products</h1>
      <Link className="add-product" to="/createProduct">
        Add Product
      </Link>
      <button className="generate-pdf" onClick={generatePDF}>
        Download Report
      </button>
      <br /> <br />
      <input
        type="text"
        placeholder="Search by product name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="product-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Supplier</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>{product.productQuantity}</td>
              <td>{product.productType}</td>
              <td>{get(product, "supplier.name")}</td>
              <td>${product.productPrice}</td>
              <td className="product-actions">
                <br />
                <div className="action-buttons">
                  <Link
                    className="update-product"
                    to={`/updateProduct/${product._id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="notify-supplier"
                    onClick={() =>
                      handleNotifySupplier(
                        product._id,
                        get(product, "supplier._id")
                      )
                    }
                  >
                    Notify
                  </button>
                  <button
                    className="delete-product"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductDisplay;
