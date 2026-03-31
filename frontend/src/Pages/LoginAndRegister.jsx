import React, { useState } from "react";
import "./CSS/LoginAndRegister.css";

const LoginAndRegister = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("This is Login", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("authToken", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const register = async () => {
    console.log("This is Register", formData);
    let responseData;
    await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("authToken", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="login-register">
      <div className="login-register-container">
        <h1>{state}</h1>
        <div className="login-register-field">
          {state === "Register" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Your Email"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>

        {state === "Register" ? (
          <div className="agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, I agree to the terms and conditions.</p>
          </div>
        ) : (
          <></>
        )}

        <button
          onClick={() => {
            state === "Login" ? login() : register();
          }}
        >
          Continue
        </button>

        {state === "Register" ? (
          <p className="login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="login">
            Don't have an account?{" "}
            <span
              onClick={() => {
                setState("Register");
              }}
            >
              Register Here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginAndRegister;
