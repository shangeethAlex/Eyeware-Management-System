import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Dropdown, Grid, Segment } from "semantic-ui-react";
import { postDelivery } from "../Api/deliveryApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashBoard from "../Employee/AdminDashBoard";
import axios from "axios";
const validateDate = (value) => {
  const selectedDate = new Date(value);
  const currentDate = new Date();

  if (selectedDate < currentDate) {
    return "The entered date should be a future date ";
  }

  return undefined; // Return undefined if validation passes
};
const validate = (values) => {
  const errors = {};
  if (!values.deliveryDate) {
    errors.deliveryDate = "Required";
  } else {
    const dateError = validateDate(values.deliveryDate);
    if (dateError) {
      errors.deliveryDate = dateError;
    }
  }
  return errors;
};

function AddDelivery() {
  const [isShippingAddress, setShippingAddress] = useState(false);
  const [orders,setOrders]=useState([]);
  const [selectedOrder,setSelectedOrder]=useState('')
  console.log("orders: ", orders);
  const initialValues = {
    status: "pending",
    address: "billingAddress",
  };

  const handleSubmit = async (values) => {
    // Handle form submission, e.g., send data to a server
    values.orderId = "ORD1";
    values.isShippingAddress = isShippingAddress;
    values.orderId=selectedOrder;
    if (!values.isShippingAddress) values.address = "";
    await postDelivery(values);
  };

  const handleAddressTypeChange = (e) => {
    setShippingAddress(e.target.value === "billingAddress" ? false : true);
  };

  useEffect(() => {
    // Function to fetch data from the database
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/orders");
        const orders=response.data.map((item,key)=>{
          return{
            key,
            text:item._id,
            value:item._id
          }
        })
        setOrders(orders); // Assuming your data is an array of orders
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

  }, []);

  const onDropDownChange =async (e, { value }) => {
    console.log("value: ", value);
    setSelectedOrder(value)
  }

  return (
    <div className="add-delivery">
       <AdminDashBoard/>
      <div >
        <div>
          <main>
            <div className="container1" style={{backgroundColor: "#ffffff",} }>
              <div className="row justify-content-center" >
                <div className="col-lg-5">
                  <br />
                  <br />
                  <br />
                  <div className="card shadow-lg border-0 rounded-lg mt-5" style={{backgroundColor: "#84A9AC",} }>
                    <div className="card-header" style={{backgroundColor: "#5588A3",} }>
                      <h3 className="text-center font-weight-light my-4" >
                        Add Delivery
                      </h3>
                    </div>
                    <div className="card-body" >
                    <Segment className="form-add">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form>
          
<div>
                <label >Order Id</label>
                <br/>
                <Dropdown
          placeholder="Orders"
          search
          selection
          options={orders}
          onChange={(e, data) => onDropDownChange(e, data)}
          value={selectedOrder}
        />
        </div>
        <br/>
        <div className="form-group">
              <label>Address</label>

              <div
                className="gap-c"
                role="group"
                aria-labelledby="address-label"
              >
                <label className="field-gap">
                  <Field
                    type="radio"
                    name="deliveryAddress"
                    value="billingAddress"
                    onChange={handleAddressTypeChange}
                  />
                  Billing Address
                </label>
                <br/>
                <br/>
                <label className="field-gap">
                  <Field
                    type="radio"
                    name="deliveryAddress"
                    value="shippingAddress"
                    onChange={handleAddressTypeChange}
                  />
                  Shipping Address
                </label>
              </div>
 <br/>
              {isShippingAddress ? (
                <div className="form-group">
                  <label className="field-gap" htmlFor="lastName">
                    Shipping Address
                  </label>
                  <Field
                    type="text"
                    name="shippingAddress"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error"
                  />
                </div>
              ) : null}

              <label>Status:</label>
              <div
                className="gap-c"
                role="group"
                aria-labelledby="status-label"
              >
                <label className="field-gap">
                  <Field type="radio" name="status" value="pending" />
                  Pending
                </label>
                <br/>
                <label className="field-gap">
                  <Field type="radio" name="status" value="inProgress" />
                  In Progress
                </label>
                <br/>
                <label className="field-gap">
                  <Field type="radio" name="status" value="completed" />
                  Completed
                </label>
              </div>
            </div>
            <br/>
            <div className="form-group gap-c">
              <label className="field-gap" htmlFor="deliveryDate">
                Delivery Date:
              </label>
              <Field type="date" name="deliveryDate" className="form-control" />
              <ErrorMessage
                name="deliveryDate"
                component="div"
                className="error"
              />
            </div>
            <br/>
            <div className="submit-button-css">
            <Button type="submit" className="btn btn-primary submit-button-css">
              Submit
            </Button>
            </div>
          </Form>
        </Formik>
      </Segment>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  
    </div>
  );
}

export default AddDelivery;
