import React, { Component } from "react";
import { Link } from "react-router-dom";
import { del, get, post } from "./request";
import keyBy from "lodash.keyby";
import lget from "lodash.get";
import jsPDF from "jspdf";
import { notification } from "antd";

class ListSupplier extends Component {
  state = {
    suppliers: [],
    createSupplierReq: {},
    notifications: {},
  };

  async componentDidMount() {
    const suppliers = await post("supplier/search", {});
    const notifications = await get("notification/open");

    this.setState({ suppliers, notifications: keyBy(notifications, "_id") });
  }

  async delete(id) {
    console.log("log clicked", id);
    const deletedSupplier = await del(`supplier/${id}`);

    const suppliers = this.state.suppliers.filter(
      (supplier) => supplier._id !== deletedSupplier._id
    );

    this.setState({ suppliers });
  }

  async readNotification(id) {
    try {
      const notification = await post(`notification/read/${id}`);

      const notifications = { ...this.state.notifications };
      notifications[notification._id] = notification;

      this.setState({ notifications });
    } catch (e) {
      console.error("log e", e);
    }
  }

  async search(email) {
    const suppliers = await post("supplier/search", { email });

    this.setState({ suppliers });
  }

  // generatePDF = () => {
  //     const { suppliers } = this.state;

  //     // Create a new instance of jsPDF
  //     const pdf = new jsPDF();

  //     // Set the header for the PDF
  //     pdf.text('Supplier Report', 14, 15);

  //     // Add content to the PDF
  //     suppliers.forEach((supplier, index) => {
  //         const yPosition = 20 + index * 10;
  //         pdf.text(`${index + 1}. Name: ${supplier.name}, Email: ${supplier.email}`, 14, yPosition);
  //     });

  //     // Save the PDF with a name
  //     pdf.save('supplier_report.pdf');
  // };

  /////////////////////
  generatePDF = () => {
    const { suppliers } = this.state; // Define 'suppliers' by accessing it from the component's state

    const doc = new jsPDF();
    doc.text("Lanka Opticals", 10, 10);
    const tableStartY = 30;

    const tableHeaders = [
      "Name",
      "Company",
      "category",
      "Phone",
      "Email",
      "Address",
    ];
    const tableData = suppliers.map((supplier) => [
      supplier.name,
      supplier.company,
      supplier.category,
      supplier.phone,
      supplier.email,
      supplier.address,
    ]);

    doc.autoTable({
      startY: tableStartY,
      head: [tableHeaders],
      body: tableData,
      startY: 20,
    });

    // Save the PDF as a file
    doc.save("supplier_report.pdf");
  };

  /////////////////////

  render() {
    const { suppliers, notifications } = this.state;

    return (
      <div className="container-fluid mt-5">
        <div className="row mt-3">
          <div className="col-3">
            <Link className="btn btn-success" to="/add">
              Add Supplier
            </Link>

            <button
              className="btn btn-primary m-lg-1"
              onClick={this.generatePDF}
            >
              Generate PDF
            </button>
          </div>

          <div className="col-8 offset-1">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Search "
              onChange={(event) => this.search(event.target.value)}
            />
          </div>
          <div className="col-1">
            {/* Add the button for generating PDF report */}
          </div>
        </div>

        <div className="row">
          <div className="col-6 offset-3">
            {Object.values(notifications)
              .filter((notification) => notification.status === "OPEN")
              .map((notification) => {
                return (
                  <div className="alert alert-info" role="alert">
                    <button
                      type="button"
                      className="btn btn-warning"
                      style={{ marginRight: "5px" }}
                      onClick={this.readNotification.bind(
                        this,
                        notification._id
                      )}
                    >
                      <i className="fa-solid fa-check fa-xl"></i>
                    </button>
                    Product: {lget(notification, "product.productName")} &nbsp;
                    Supplier: {lget(notification, "supplier.name")}
                  </div>
                );
              })}
          </div>
        </div>

        <table className="table mt-5">
          <thead>
            <tr className="bg-success">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Product</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {!!suppliers &&
              suppliers.map((supplier, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{supplier.name}</td>
                    <td>{supplier.address}</td>
                    <td>{supplier.category}</td>
                    <td>{supplier.phone}</td>
                    <td>{supplier.email}</td>
                    <Link
                      to={`/view/${supplier._id}`}
                      className="btn btn btn-sm mr-2"
                      style={{ backgroundColor: "#00416a", color: "white" }}
                    >
                      <i className="fa fa-eye" aria-hidden="true"></i> View
                    </Link>
                    <Link
                      to={`/edit/${supplier._id}`}
                      className="btn btn btn-sm mr-2"
                      style={{ backgroundColor: "#ffc40c", color: "white" }}
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                    </Link>
                    <button
                      onClick={() => this.delete(supplier._id)}
                      className="btn btn btn-sm"
                      style={{ backgroundColor: "#7c0a02 ", color: "white" }}
                    >
                      <i
                        className="fa fa-ban delete-icon"
                        aria-hidden="true"
                      ></i>{" "}
                      Delete
                    </button>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListSupplier;
