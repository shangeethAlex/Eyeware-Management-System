import React, { useState } from "react";
import axios from "axios";
import AdminDashBoard from "./AdminDashBoard";

function AddSalesExecutive() {
  const [sid, setSid] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [qualification, setQualification] = useState("");
  const [basicsalary, setBasicSalary] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const eid = sid;

  const [passwordError, setPasswordError] = useState("");
  const [sidError, setSidError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const[repasswordError, setRePasswordError] = useState("");

  function convert(e) {
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

  const validateSid = (sid) => {
    if (!sid.startsWith("S")) {
      setSidError("Sid should start with 'S'");
    } else if (sid.length !== 4) {
      setSidError("Sid should consist of 4 characters");
    } else {
      setSidError("");
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
      setAgeError("Employee's age should be greater than 21");
    } else {
      setAgeError("");
    }
  };




  async function sendData(e) {
    e.preventDefault();

    validatePassword(password);
    validateSid(sid);
    validateEmail(email);
    validateAge(dob);
    validateRePassword(repassword);

    if (
      !sid ||
      !fullname ||
      !email ||
      !password ||
      !repassword ||
      !address ||
      !phone ||
      !dob ||
      !qualification ||
      !basicsalary ||
      !gender
    ) {
      alert("Fields can't be empty");
    }  else {
      await axios
        .post("http://localhost:8070/salesexecutive/addse", {
          sid,
          fullname,
          email,
          address,
          phone,
          password,
          dob,
          qualification,
          basicsalary,
          gender,
          image,
        })
        .then((res) => {
          if (res.data === "Taken") {
            alert("User already available provide another email address ");
          } else if (res.data === "Id") {
            alert(" Sid already taken please provide another id");
          } else {
            alert("Inserted new Sales Executive");
            window.location.replace("/allse");
          }
        })
        .catch((err) => {
          alert(err);
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
            <div className="container1" style={{backgroundColor: "#E8E8E8",} }>
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  
                  <br />
                  <br />
                  <br />
                  <br/>
                 
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    
                    <div className="card-header1">
                      <h3 className="text-center font-weight-light my-4">
                        Add Sales Executive
                      </h3>
                    </div>
                    <div className="card-body">
                      <form method="post">
                        <div className="form-floating mb-3">
                          <label>Sales executive Id :</label>
                          <br />
                          <br />
                          <input
                            className={`form-control ${sidError ? "is-invalid" : ""}`}
                            type="text"
                            name="sid"
                            id="sid"
                            pattern="[S][0-9][0-9][0-9]"
                            placeholder="Type employee id"
                            aria-required="true"
                            onChange={(e) => {
                              setSid(e.target.value);
                              validateSid(e.target.value);
                            }}
                            value={sid}
                          />
                          {sidError && <div className="invalid-feedback">{sidError}</div>}
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
                            value={fullname}
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
                            name="email"
                            id="em"
                            placeholder="Type email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                              validateEmail(e.target.value);
                            }}
                            value={email}
                            required
                          />
                          {emailError && <div className="invalid-feedback">{emailError}</div>}
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
                            value = {password}
                            required
                          />
                           {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                        </div>

                        <div className="form-floating mb-3">
                          <label>Re-Type Password :</label>
                          <br />
                          <br />
                          <input
                            className={`form-control ${repasswordError ? "is-invalid" : ""}`}
                            type="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            name="repassword"
                            placeholder="Type password"
                            onChange={(e) => {
                              setRePassword(e.target.value);
                              validateRePassword(e.target.value)
                            }}
                            value = {repassword}
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
                            value = {address}
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
                            value = {phone}
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
                            id="dob"
                            placeholder="Type age"
                            onChange={(e) => {
                              setDob(e.target.value);
                              validateAge(e.target.value);
                            }}
                            required
                            value={dob}
                          />
                          {ageError && <div className="invalid-feedback">{ageError}</div>}
                        </div>

                        <div className="form-floating mb-3">
                          <label>Qualification :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            name="qualification"
                            placeholder="Type qualification"
                            onChange={(e) => {
                              setQualification(e.target.value);
                            }}
                            required
                            value = {qualification}
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
                            value = {basicsalary}
                            required
                          />
                        </div>
                        <br />

                        <div>
                          <label>Gender : &nbsp;</label>
                          <input
                            type="radio"
                            id="m"
                            name="gender"
                            value="Male"
                            onChange={(e) => {
                              setGender(e.target.value);
                            }}
                            required
                          ></input>
                          <label htmlFor="m"> &nbsp;&nbsp;Male &nbsp;</label>
                          <input
                            type="radio"
                            id="f"
                            name="gender"
                            value="Female"
                            onChange={(e) => {
                              setGender(e.target.value);
                            }}
                            required
                            
                          ></input>
                          <label htmlFor="f"> &nbsp;&nbsp;Female</label>
                          <br />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Add Image :</label>
                          <br />
                          <br />
                          <input
                            type="file"
                            placeholder="Add Image"
                            accept="image/"
                            onChange={convert}
                            required
                          />
                        </div>

                        <br />

                        <div className="d-grid">
                          <input
                            type="submit"
                            className="btn btn-primary"
                            onClick={sendData}
                            value="Add"
                            disabled={!!sidError || !!passwordError || !!emailError || !!ageError}
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

export default AddSalesExecutive;
