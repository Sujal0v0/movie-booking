import React, { useState } from "react";
import logo from "../assets/bookamovie.svg";
import { instance } from "../utils/axios";
const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await instance.post("/users/login", payload);
    console.log(result);
  };
  const handleImageErr = (e) => {
    e.target.src =
      "https://i.pinimg.com/736x/c2/5a/83/c25a838aa58df060864f44400b945b3b.jpg";
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="px-5 pt-5 text-center "
        style={{ boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px " }}
        onSubmit={(e) => handleLogin(e)}
      >
        <img
          src={logo}
          alt="logo"
          className="center"
          style={{ height: "80px", paddingBottom: "20px" }}
          onError={(e) => {
            handleImageErr(e);
          }}
        />

        <h5 className="fw-bold mb-2 pb-2 fs-4" style={{ letterSpacing: "1px" }}>
          Sign into your account
        </h5>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control form-control-lg"
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
        </div>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control form-control-lg"
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
          />
        </div>
        <div className="pt-1 mb-4">
          <button
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-dark btn-lg btn-block"
            type="submit"
          >
            Login
          </button>
        </div>
        <a className="small text-muted" href="#!">
          Forgot password?
        </a>
        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
          Don&apos;t have an account?{" "}
          <a href="#!" style={{ color: "#393f81" }}>
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
