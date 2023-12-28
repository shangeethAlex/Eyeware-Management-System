import React, { useState } from "react";
import ShippingForm from "./shippingForm";
import PaymentDetails from "./paymentDetails";
import Footer from "../header&Footer/Footer";
import Header from "../header&Footer/Header";
function FormSwitcher() {
  const [firstName, setfirstName] = useState(null);
  const [mail, setMail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);

  const childDetails = (value) => {
    setfirstName(value.firstName);
    setMail(value.email);
    setPhone(value.telephone);
    setAddress(value.address);
  };

  // disable left side component
  const [isSecondComponentEnabled, setSecondComponentEnabled] = useState(false);

  const enableSecondComponent = (isEnabled) => {
    setSecondComponentEnabled(isEnabled); // Enable or disable the second component
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="container">
          <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row mt-5">
            <h2 className="texts mb-3 mb-lg-0">Checkout</h2>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-8">
              <ShippingForm
                enableSecondComponent={enableSecondComponent}
                callback={childDetails}
              />
            </div>
            <div className="col-lg-4">
              <PaymentDetails
                isEnabled={isSecondComponentEnabled}
                firstName={firstName}
                mail={mail}
                phone={phone}
                address={address}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormSwitcher;
