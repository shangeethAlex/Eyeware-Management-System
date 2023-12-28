import React, { useEffect, useState } from "react";
import { Button, Modal, Segment } from "semantic-ui-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { putDelivery } from "../Api/deliveryApi";
import * as moment from "moment";
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

const initialValues = (data) => {
  console.log(data);
  return {
    status: data.status ? data.status : "",
    address: data.address ? data.address : "",
    deliveryDate: data.deliveryDate
      ? moment(data.deliveryDate).format("YYYY-MM-DD")
      : "",
    shippingAddress: data.isShippingAddress ? data.address : "",
  };
};

function EditModal({ data,handleEditDone }) {
  const [open, setOpen] = React.useState(false);
  const [isShippingAddress, setShippingAddress] = useState(false);

  const handleSubmit = async (values) => {
    console.log("values: ", values);
    values.orderId = "ORD1";
    values.isShippingAddress = isShippingAddress;
    if (!values.isShippingAddress) values.address = "";
    await putDelivery(values, data._id);
    setOpen(false);
    handleEditDone();
  };

  useEffect(() => {
    if (data) {
      setShippingAddress(data.isShippingAddress);
    }
  }, [data]);

  const handleAddressTypeChange = (e) => {
    setShippingAddress(e.target.value === "billingAddress" ? false : true);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<button className="btn btn bg-warning">Edit</button>}
    >
      <Modal.Header>Edit -{data._id} </Modal.Header>
      <Modal.Content>
        <div>
       
            <Formik
              initialValues={initialValues(data)}
              validate={validate}
              onSubmit={handleSubmit}
            >
              <Form>
              <Segment className="form-add">
                <div className="form-group">
                  <label>Address</label>

                  <div role="group" aria-labelledby="address-label">
                    <label>
                      <Field
                        type="radio"
                        name="address"
                        value="billingAddress"
                        onChange={handleAddressTypeChange}
                      />
                      Billing Address
                    </label>
                    <br/>
                <br/>

                
                    <label>
                      <Field
                        type="radio"
                        name="address"
                        value="shippingAddress"
                        onChange={handleAddressTypeChange}
                      />
                      Shipping Address
                    </label>
                  </div>

                  <br/>

                  {isShippingAddress ? (
                    <div className="form-group">
                      <label htmlFor="shippingAddress">Shipping Address</label>
                      <Field
                        type="text"
                        name="shippingAddress"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="shippingAddress"
                        component="div"
                        className="error"
                      />
                    </div>
                  ) : null}
 <br/>
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
                <br/>
                <br/>
                <div className="form-group">
                  <label htmlFor="deliveryDate">Delivery Date:</label>
                  <Field
                    type="date"
                    name="deliveryDate"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="deliveryDate"
                    component="div"
                    className="error"
                  />
                </div>
                <br/>
                </Segment>
                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>
              </Form>
            </Formik>
        
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default EditModal;
