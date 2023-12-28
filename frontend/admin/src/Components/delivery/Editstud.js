import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Grid, Segment } from "semantic-ui-react";
import { postDelivery } from "../Api/deliveryApi";

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

function EditDelivery() {
  const [isShippingAddress, setShippingAddress] = useState(false);
  const initialValues = {
    status: "pending",
    address: "billingAddress",
  };

  const handleSubmit = async (values) => {
    // Handle form submission, e.g., send data to a server
    values.orderId = "ORD1";
    values.isShippingAddress = isShippingAddress;
    if (!values.isShippingAddress) values.address = "";
    console.log("values: ", values);
    await postDelivery(values);
  };

  const handleAddressTypeChange = (e) => {
    setShippingAddress(e.target.value === "billingAddress" ? false : true);
  };

  return (
    <div>
      <h1>Add Delivery</h1>
      <Segment className="form-add">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group">
              <label>Address</label>

              <div role="group" aria-labelledby="address-label">
                <label>
                  <Field
                    type="radio"
                    name="deliveryAddress"
                    value="billingAddress"
                    onChange={handleAddressTypeChange}
                  />
                  Billing Address
                </label>
                <label>
                  <Field
                    type="radio"
                    name="deliveryAddress"
                    value="shippingAddress"
                    onChange={handleAddressTypeChange}
                  />
                  Shipping Address
                </label>
              </div>

              {isShippingAddress ? (
                <div className="form-group">
                  <label htmlFor="lastName">Shipping Address</label>
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
              <div role="group" aria-labelledby="status-label">
                <label>
                  <Field type="radio" name="status" value="pending" />
                  Pending
                </label>
                <label>
                  <Field type="radio" name="status" value="inProgress" />
                  In Progress
                </label>
                <label>
                  <Field type="radio" name="status" value="completed" />
                  Completed
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="deliveryDate">Delivery Date:</label>
              <Field type="date" name="deliveryDate" className="form-control" />
              <ErrorMessage
                name="deliveryDate"
                component="div"
                className="error"
              />
            </div>

            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </Form>
        </Formik>
      </Segment>
    </div>
  );
}

export default EditDelivery;
