import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Common/loginstyle.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accType, setAccType] = useState("");

  let navigate = useNavigate();

  async function send(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8070/login/log", {
          email,
          password,
          accType,
        })
        .then((res) => {
          if (res.data.type === "admin") {
            window.localStorage.setItem(
              "AdminInfo",
              JSON.stringify(res.data.check1)
            );
            console.log(res.data.check1.email);
            navigate("/adhome");
          } else if (res.data.type === "se") {
            window.localStorage.setItem(
              "SEInfo",
              JSON.stringify(res.data.check2)
            );
            navigate("/sehome");
          } else if (res.data.type === "dd") {
            window.localStorage.setItem(
              "DDInfo",
              JSON.stringify(res.data.check3)
            );
            navigate("/ddhome");
          } else if (res.data === "Not exist") {
            alert("No such user available");
          } else if (res.data === "Invalid Password") {
            alert("Invalid Password");
          }
        })
        .catch((e) => {
          alert("Wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <body class="my-custom-background">
     <div >
                    <div className="container-cus">
                      <form>
                        <div class = "login-box">
                      <h1 class = "login-box-h2">  Login
                      </h1>
                        <div className="user-box label">
                          <label>Email :</label>
                          <br />
                          <br />
                          <input
                            className="user-box input"
                            type="text"
                            placeholder="Type your user name"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                        <div className="user-box label">
                          <label>Password :</label>
                          <br />
                          <br />
                          <input
                            className="user-box input"
                            type="password"
                            placeholder="Type your password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>

                        <div>
                            <div class="user-box lable">
                          <label >Type : &nbsp;</label> </div>
                          <br></br>
                          <br></br>
                          <br></br>
                          <input
                            className="user-box input"
                            type="radio"
                            id="a"
                            name="type"
                            value="Admin"
                            onChange={(e) => {
                              setAccType(e.target.value);
                            }}
                            required
                          ></input>
                          <label htmlFor="m"> &nbsp;&nbsp;Admin &nbsp;</label>
                          <input
                            type="radio"
                            id="s"
                            name="type"
                            value="Sales Executive"
                            onChange={(e) => {
                              setAccType(e.target.value);
                            }}
                            required
                          ></input>
                          <label htmlFor="f">
                            {" "}
                            &nbsp;&nbsp;Sales Executive &nbsp;
                          </label>
                          <input
                            type="radio"
                            id="d"
                            name="type"
                            value="Delivery Driver"
                            onChange={(e) => {
                              setAccType(e.target.value);
                            }}
                            required
                          ></input>
                          <label htmlFor="f">
                            {" "}
                            &nbsp;&nbsp;Delivery Driver
                          </label>
                          <br />
                        </div>
                        <br></br>

                        <div className="subBtn">
                          <input
                            type="submit"
                            className="btnLogin"
                            value="Login"
                            onClick={send}
                          ></input>
                        </div>
                          <a
                            className="cus-a"
                            href="/"
                          >
                            Don't Have an account?
                          </a>
                        </div>
                      </form>

                    </div>
                  </div>  
                  </body>
  );
}

export default Login;
