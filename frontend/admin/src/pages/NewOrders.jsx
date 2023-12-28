import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import CreateIcon from "@mui/icons-material/Create";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import { useReactToPrint } from "react-to-print";
// import emailjs from "emailjs-com";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";

function NewOrders() {
  const [orders, setOrders] = useState();
  const componentPDF = useRef();
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [originalOrders, setOriginalOrders] = useState([]);
  const [searchCustomerName, setSearchCouponName] = useState("");

  //   const sendEmail = () => {
  //     // e.preventDefault();+

  //     emailjs
  //       .send(
  //         "service_2uho7ns",
  //         "template_a1jusfa",
  //         {
  //           to_name: "Lenin",
  //           to_email: customerEmail,
  //           from_name: "LankaOpticals",
  //         },
  //         "3pWQQeGiP1sL4J8-L"
  //       )
  //       .then(
  //         function (response) {
  //           console.log("Email sent successfully:", response);
  //         },
  //         function (error) {
  //           console.error("Email not sent:", error);
  //         }
  //       );
  //   };
  /////////////////////////////////////////////////////////////////
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("LANKA OPTICALS - Orders Report", 105, 15, "center");
    const tableStartY = 30;
    const tableHeaders = [
      // "Order ID",
      "Customer",
      "Status",
      "Ordered Date",
      "Order Amount",
    ];
    const tableData = orders.map((order) => [
      // order._id,
      order.customerId,
      order.orderStatus,
      new Date(order.orderDate).toLocaleDateString("en-GB"),
      order.orderTotal,
    ]);

    doc.autoTable({
      
      startY: tableStartY,
      head: [tableHeaders],
      body: tableData,
      startY: 20,
    });

    // Save the PDF as a file
    doc.save("Orders.pdf");
  };

  ///////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (originalOrders) {
      // Filter the orders array based on the searchQuery
      const filteredOrdersByCustomerId = originalOrders.filter(
        (order) =>
          order.customerId &&
          order.customerId.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Filter the filteredOrdersByCustomerId array based on the searchCustomerName
      const filteredOrders = filteredOrdersByCustomerId.filter(
        (order) =>
          order.customerId &&
          order.customerId
            .toLowerCase()
            .includes(searchCustomerName.toLowerCase())
      );

      // Update the state with filtered results
      setOrders(filteredOrders);
    }
  }, [searchQuery, searchCustomerName, originalOrders]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    // Filter the orders array based on the searchQuery
    const filteredOrders = orders.filter((order) =>
      order.customerId.toLowerCase().includes(query)
    );
    // Update the state with filtered results
    setOrders(filteredOrders);
    setSearchQuery(query);
  };

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure want to delete?",
        text: "This cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete Order",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:8070/orders/${id}`)
            .then((res) => {
              console.log(res);
              //   navigate("/");
            })
            .catch((errr) => console.log(errr));
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "The order has been deleted.",
            "success"
          );
          window.location.reload();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your order is safe :)",
            "error"
          );
        }
      });
  };

  const handleCancel = (id) => {
    // sendEmail();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure want to cancel?",
        text: "This cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Cancel Order",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`http://localhost:8070/orders/${id}`, {
              orderStatus: "Cancelled",
            })
            .then((res) => {
              console.log(res);
              // navigate("/");
            })
            .catch((errr) => console.log(errr));
          swalWithBootstrapButtons.fire(
            "Cancelled!",
            "The order has been cancelled.",
            "success"
          );
          window.location.reload();
        }
      });
  };

  const handleShipped = (id) => {
    // sendEmail();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Change status to shipping?",
        showCancelButton: true,
        confirmButtonText: "yes",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`http://localhost:8070/orders/${id}`, {
              orderStatus: "Shipped",
            })
            .then((res) => {
              console.log(res);
              navigate("/");
            })
            .catch((errr) => console.log(errr));
          swalWithBootstrapButtons.fire("Changed!", "success");
          window.location.reload();
        }
      });
  };

  //
  useEffect(() => {
    // Function to fetch data from the database
    const fetchData = async () => {
      try {
        const response = await axios
          .get("http://localhost:8070/orders")
          .then((response) => {
            const sortedOrders = response.data.sort((a, b) => {
              return new Date(b.orderDate) - new Date(a.orderDate);
            });
            setOrders(sortedOrders);
            setOriginalOrders(sortedOrders);
            console.log(response);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  //   const geneatePdf = useReactToPrint({
  //     content: () => componentPDF.current,
  //     documentTitle: "Orders",
  //     onAfterPrint: () => alert("done"),
  //   });

  // const handleViewDetails = (orderId) => {
  //   axios
  //     .get(`http://localhost:8070/orders/products/652aa1e85a663c2118d2d94a`)
  //     .then((response) => {
  //       const orderedItems = response.data;
  //       const orderedItemsText = orderedItems
  //         .map((item) => `${item.productTitle} x ${item.quantity}`)
  //         .join("\n");
  //       Swal.fire({
  //         title: "Ordered Items",
  //         text: orderedItemsText,
  //         icon: "info",
  //       });
  //     })
  //     .catch((error) => console.error(error));
  // };

  return (
    <div className="order">
      {/* <Header></Header>

      <AdminSideBar></AdminSideBar> */}
      <div className="d-flex vh-100 align-items-center  input-group justify-content-lg-between">
        <div className="row" id="iii">
          {/* <div className="col schclass input-group">
            <input
              type="search"
              className="form-control rounded"
              placeholder="code"
              aria-label="Search"
              value={searchQuery}
              aria-describedby="search-addon"
            />
          </div> */}
          <div className="col">
            <button className="btn btn-danger" onClick={generatePDF} id="btn1">
              Generate Report
            </button>
          </div>
          <div className="col">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearch}
              aria-describedby="search-addon"
            />
          </div>
        </div>
        <div className="w-100 bg-white rounded p-4 ">
          {/* <Link to="/create" className="btn btn-success" id="btn1">
            Create coupon
          </Link> */}
          {/* <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
            id="btn1"
          >
            Send Coupon
          </button> */}
          {/* <button className="btn btn-danger" onClick={generatePDF} id="btn1">
            <DownloadOutlinedIcon />
          </button> */}
          <div
            className="table-container tbl-order"
            style={{ height: "550px", overflowY: "auto" }}
          >
            <div ref={componentPDF} style={{ width: "100%" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    {/* <th>Order ID</th> */}
                    <th>Customer</th>
                    {/* <th>Order Detail</th> */}
                    <th>Status</th>
                    <th>Ordered Date</th>
                    <th>Order Amount</th>
                    <th>Functions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order._id}>
                      {/* <td>{order._id}</td> */}
                      <td>{order.customerId}</td>
                      {/* <td>
                        <button
                          className="btn btn-primary"
                          id="btn1"
                          onClick={() => handleViewDetails(order._id)}
                        >
                          view items
                        </button>
                      </td> */}
                      <td>{order.orderStatus}</td>
                      <td>
                        {new Date(order.orderDate).toLocaleDateString("en-GB")}
                      </td>
                      <td style={{ textAlign: "right" }}>{order.orderTotal}</td>
                      <td>
                        {/* <Link
                          to={`/update/${order._id}`}
                          className="btn btn-primary"
                          id="btn1"
                        >
                          <CreateIcon />
                        </Link> */}
                        {order.orderStatus === "Cancelled" ? (
                          <button
                            className="btn btn-danger"
                            id="btn1"
                            onClick={() => handleDelete(order._id)}
                          >
                            Delete
                          </button>
                        ) : order.orderStatus === "Pending" ? (
                          <>
                            <button
                              className="btn btn-success"
                              id="btn1"
                              onClick={() => handleShipped(order._id)}
                            >
                              Ship
                            </button>
                            <button
                              className="btn btn-danger"
                              id="btn1"
                              onClick={() => handleCancel(order._id)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn btn-danger"
                            id="btn1"
                            onClick={() => handleCancel(order._id)}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrders;
