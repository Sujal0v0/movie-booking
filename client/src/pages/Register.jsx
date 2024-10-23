import { useRef, useState } from "react";
import logo from "../assets/bookamovie.svg";
import { Notify } from "../components/Notify";
import { instance } from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerRef = useRef();
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const form = registerRef.current;
      const payload = new FormData(form);
      const { data } = await instance.post("/users/register", payload);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      setMsg(data?.message);
    } catch (error) {
      const errMsg =
        error?.response?.data?.msg || "Something went wrong. Try again!";
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
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="px-5 pt-5 text-center "
        style={{ boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px " }}
        onSubmit={(e) => handleRegister(e)}
        ref={registerRef}
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
          Register
        </h5>
        {error && <Notify message={error} />}
        {msg && <Notify variant="alert-success" message={msg} />}
        <div data-mdb-input-init className="text-start form-outline mb-4">
          <label className="form-label ">Name</label>
          <input
            type="text"
            className="form-control form-control-lg"
            required
            name="name"
          />
        </div>
        <div data-mdb-input-init className="text-start form-outline mb-4">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control form-control-lg"
            required
            name="email"
          />
        </div>
        <div data-mdb-input-init className="text-start form-outline mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control form-control-lg"
            required
            name="password"
          />
        </div>
        <div data-mdb-input-init className="text-start form-outline mb-4">
          <label className="form-label">Profile Picture</label>
          <input className="form-control" type="file" name="profile"></input>
        </div>
        <div className="pt-1 mb-4">
          <button
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-dark btn-lg btn-block"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
