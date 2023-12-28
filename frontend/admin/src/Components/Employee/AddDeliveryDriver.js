import React, { useState } from "react";
import axios from "axios";
import AdminDashBoard from "./AdminDashBoard";

function AddDeliveryDriver() {
  const [did, setDid] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [licenseno, setLicenseNo] = useState("");
  const [vehicleno, setVehicleNo] = useState("");
  const [nic, setNic] = useState("");
  const [basicsalary, setBasicSalary] = useState("");
  const [image, setImage] = useState("");
  const eid = did;

  const [passwordError, setPasswordError] = useState("");
  const [didError, setDidError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const[repasswordError, setRePasswordError] = useState("");

  function convert(e) {//function to convert image as url
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  const validatePassword = (password) => {
    if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/)) {
      setPasswordError("Password should contain a lowercase letter, an uppercase letter, a number, and be at least 8 characters long");
    } else if (password.length < 8) {
      setPasswordError("Password should consist at least 8 characters");
    }else {
      setPasswordError("");
    }
  };

  const validateRePassword = (repassword) => {
  if (password !== repassword) {
    setRePasswordError("Password Mismatch");
  }else {
    setRePasswordError("");
  }
};

  const validateDid = (did) => {
    if (!did.startsWith("D")) {
      setDidError("did should start with 'D'");
    } else if (did.length !== 4) {
      setDidError("did should consist of 4 characters");
    } else {
      setDidError("");
    }
  };

  const validateEmail = (email) => {
    if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };

  const validateAge = (dob) => {
    const d1 = new Date(dob);
    const d2 = new Date();
    const diff = d2.getTime() - d1.getTime();
    const daydiff = (diff / 31536000000).toFixed(0);

    if (daydiff < 21) {
      setAgeError("Delivery Driver's age should be greater than 21");
    } else {
      setAgeError("");
    }
  };

  async function sendData(e) {
    e.preventDefault();

    validatePassword(password);
    validateDid(did);
    validateEmail(email);
    validateAge(dob);
    validateRePassword(repassword);

    if (
      !did ||
      !fullname ||
      !email ||
      !password ||
      !repassword ||
      !address ||
      !phone ||
      !dob ||
      !licenseno ||
      !vehicleno ||
      !nic ||
      !basicsalary 
    ) {
      alert("Fields can't be empty");
    } else {
      await axios
        .post("http://localhost:8070/deliverydriver/adddd", {
          did,
          fullname,
          email,
          password,
          address,
          phone,
          dob,
          licenseno,
          vehicleno,
          nic,
          basicsalary,
          image,
        })
        .then((res) => {
          if (res.data === "Taken") {
            alert("User already available provide another email address ");
          } else if (res.data === "Id") {
            alert("User Id already taken please provide another id");
          } else {
            alert("Inserted new Delivery Driver");
            window.location.replace("/alldd");
          }
        })
        .catch((msg) => {
          alert(msg);
        });

      await axios
        .post("http://localhost:8070/t/det", { eid, email, basicsalary })
        .then((res) => {})
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div>
      <AdminDashBoard></AdminDashBoard>
      <div>
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
                        Add Delivery Driver
                      </h3>
                    </div>
                    <div className="card-body" >
                      <form method="post">
                        <div className="form-floating mb-3">
                          <label>Delivery Driver Id :</label>
                          <br />
                          <br />
                          <input
                            className={`form-control ${didError ? "is-invalid" : ""}`}
                            type="text"
                            size={4}
                            id="did"
                            name="sid"
                            placeholder="Type employee id"
                            aria-required="true"
                            onChange={(e) => {
                              setDid(e.target.value);
                              validateDid(e.target.value);
                            }}
                          />
                          {didError && <div className="invalid-feedback" style={{color: '#ffffff'} }>{didError}</div>}
                        </div>
                        <div className="form-floating mb-3">
                          <label>Full name :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="fullname"
                            placeholder="Type full name"
                            onChange={(e) => {
                              setFullname(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Email :</label>
                          <br />
                          <br />
                          <input
                            className={`form-control ${emailError ? "is-invalid" : ""}`}
                            type="email"
                            id="em"
                            name="email"
                            placeholder="Type email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                              validateEmail(e.target.value);
                            }}
                            required
                          />
                          {emailError && <div className="invalid-feedback" style={{color: '#ffffff'} }>{emailError}</div>}
                        </div>

                        <div className="form-floating mb-3">
                          <label>Password :</label>
                          <br />
                          <br />
                          <input
                            className={`form-control ${passwordError ? "is-invalid" : ""}`}
                            type="password"
                            id="pswd"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            name="password"
                            placeholder="Type password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                              validatePassword(e.target.value);
                            }}
                            required
                          />
                          {passwordError && <div className="invalid-feedback"  style={{color: '#ffffff'} }>{passwordError}</div>}
                        </div>

                        <div className="form-floating mb-3">
                          <label>Re-Type Password :</label>
                          <br />
                          <br />
                          <input
                            className={`form-control ${repasswordError ? "is-invalid" : ""}`}
                            type="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            name="password"
                            placeholder="Type password"
                            onChange={(e) => {
                              setRePassword(e.target.value);
                              validateRePassword(e.target.value);
                            }}
                            required
                          />
                          {repasswordError && <div className="invalid-feedback">{repasswordError}</div>}
                        </div>

                        <div className="form-floating mb-3">
                          <label>Address :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="address"
                            placeholder="Type addresss"
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Contact No :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Type contact number"
                            pattern="[0-9]{10}"
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            required
                          ></input>
                        </div>

                        <div className="form-floating mb-3">
                          <label>Date of Birth :</label>
                          <br />
                          <br />
                          <input
                            className={`form-control ${ageError ? "is-invalid" : ""}`}
                            type="date"
                            name="age"
                            placeholder="Type age"
                            onChange={(e) => {
                              setDob(e.target.value);
                              validateAge(e.target.value);
                            }}
                            required
                          />
                           {ageError && <div className="invalid-feedback" style={{color: '#ffffff'} }>{ageError}</div>}
                        </div>

                        <div className="form-floating mb-3">
                          <label>License No :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="licenseno"
                            placeholder="Type license no"
                            onChange={(e) => {
                              setLicenseNo(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Vehicle No :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="vehicleno"
                            placeholder="Type vehicle no"
                            onChange={(e) => {
                              setVehicleNo(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>NIC No :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="nic"
                            placeholder="Type nic no"
                            onChange={(e) => {
                              setNic(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Basic Salary :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="basicsalary"
                            placeholder="Type basic salary"
                            onChange={(e) => {
                              setBasicSalary(e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Add Image :</label>
                          <br />
                          <br />
                          <input
                            type="file"
                            placeholder="Add Image"
                            accept="image/"
                            filename="image"
                            onChange={convert}
                            required
                          />
                        </div>

                        <br />

                        <div className="d-grid">
                          <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            onClick={sendData}
                            value="Add"
                            disabled={!!didError || !!passwordError || !!emailError || !!ageError}
                          ></input>
                        </div>
                      </form>
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

export default AddDeliveryDriver;
