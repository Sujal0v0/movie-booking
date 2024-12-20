import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/bookamovie.svg";
import { instance } from "../utils/axios";
import { setToken } from "../utils/storage";
import { Notify } from "../components/Notify";

const Login = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { data } = await instance.post("/users/login", payload);
      const { data: token, message } = data;
      setMsg(message);
      setToken("token", token);
      navigate("/");
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong!!";
      setError(errMsg);
    } finally {
      setTimeout(() => {
        setError("");
        setMsg("");
      }, 3000);
    }
  };
  const handleImageErr = (e) => {
    e.target.src =
      "https://i.pinimg.com/736x/c2/5a/83/c25a838aa58df060864f44400b945b3b.jpg";
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [navigate]);
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
        {error && <Notify message={error} />}
        {msg && <Notify variant="alert-success" message={msg} />}
        <div data-mdb-input-init className="text-start form-outline mb-4">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control form-control-lg"
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
            required
          />
        </div>
        <div data-mdb-input-init className="text-start form-outline mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control form-control-lg"
            name="password"
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
            required
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
        <Link className="small text-muted" to="/forget-password">
          Forgot password?
        </Link>
        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
          Don&apos;t have an account?{" "}
          <Link style={{ color: "#393f81" }} to="/register">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
