import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Common/loginstyle.css"

function SignUp() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const[repasswordError, setRePasswordError] = useState("");

  let navigate = useNavigate();

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

  const validateEmail = (email) => {
    if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };

  async function sendData(e) {
    e.preventDefault();
  
    validatePassword(password);
    validateEmail(email);
    validateRePassword(repassword);
  
    if (
      !fullname ||
      !email ||
      !password ||
      !repassword 
    ) {
      alert("Fields can't be empty");
    }  else {
      await axios
        .post("http://localhost:8070/admin/addad", {
          fullname,
          email,
          password,
        })
        .then((res) => {
          if (res.data === "Taken") {
            alert("User already available provide another email address ");
          } else alert("Inserted new Admin");
          navigate("/login");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <body className="my-custom-background">
    <div >
                    <div className="container-cus">

                      <form method="post">
                      <div class = "login-box">
                      <h1 class = "login-box-h2">
                        Admin Sign Up
                      </h1>
                        <div className="user-box label">
                          <label>Full Name :</label>
                          <br />
                          <br />
                          <input
                            className="user-box input"
                            type="text"
                            placeholder="Type your full name"
                            onChange={(e) => {
                              setFullname(e.target.value);
                            }}
                          />
                        </div>

                        <div className="user-box label">
                          <label>Email :</label>
                          <br />
                          <br />
                          <input
                            className={`user-box input ${emailError ? "is-invalid" : ""}`}
                            type="email"
                            id="em"
                            placeholder="Type your email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                              validateEmail(e.target.value);
                            }}
                          />
                          {emailError && <div className="invalid-feedback">{emailError}</div>}
                        </div>

                        <div className="user-box label">
                          <label>Password :</label>
                          <br />
                          <br />
                          <input
                            className={`user-box input ${passwordError ? "is-invalid" : ""}`}
                            type="password"
                            id="pswd"
                            placeholder="Type your password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                              validatePassword(e.target.value);
                            }}
                          />
                           {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                        </div>

                        <div className="user-box label">
                          <label>Re-Type Password :</label>
                          <br />
                          <br />
                          <input
                            className={`user-box input ${repasswordError ? "is-invalid" : ""}`}
                            type="password"
                            placeholder="Type your password"
                            onChange={(e) => {
                              setRePassword(e.target.value);
                              validateRePassword(e.target.value)
                            }}
                          />
                          {repasswordError && <div className="invalid-feedback">{repasswordError}</div>}
                        </div>

                        <div className="subBtn">
                          <input
                            type="submit"
                            className="btnLogin"
                            onClick={sendData}
                            value="Create Account"
                          ></input>
                        </div>

                          <a
                            className="cus-a"
                            href="/login"
                          >
                            Already Have an account?
                          </a>
                       
                        </div>
                      </form>
                    </div>
                  </div>
                  </body>
  );
}

export default SignUp;
