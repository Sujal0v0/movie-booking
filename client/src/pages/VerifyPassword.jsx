import logo from "../assets/bookamovie.svg";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { instance } from "../utils/axios";
import { Notify } from "../components/Notify";
const VerifyPassword = () => {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { state } = useLocation();

  const [payload, setPayload] = useState({
    email: state?.email || "",
    otp: "",
    newPassword: "",
  });

  const handleVerifyPassword = async (e) => {
    try {
      e.preventDefault();
      const { data } = await instance.post("/users/forget-password", payload);
      const { data: status, message } = data;
      setMsg(message);
      if (status) {
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || "Something went wrong. Try again!";
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
    if (!state?.email) {
      navigate("/login", { replace: true });
    }
  }, [navigate, state?.email]);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="px-5 pt-5 text-center "
        style={{ boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px " }}
        onSubmit={(e) => {
          handleVerifyPassword(e);
        }}
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
          Verify Password
        </h5>
        {error && <Notify message={error} />}
        {msg && <Notify variant="alert-success" message={msg} />}
        <div data-mdb-input-init className="text-start form-outline mb-4">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control form-control-lg"
            required
            name="email"
            value={state?.email}
          />
        </div>
        <div data-mdb-input-init className="text-start form-outline mb-4">
          <label className="form-label">Token</label>
          <input
            type="text"
            className="form-control form-control-lg"
            required
            name="token"
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, otp: e.target.value };
              });
            }}
            minLength="6"
            maxLength="6"
          />
          <small className="text-muted" style={{ fontSize: "13px" }}>
            Token is sent to email
          </small>
        </div>
        <div data-mdb-input-init className="text-start form-outline mb-4">
          <label className="form-label">New Password</label>
          <input
            type="text"
            className="form-control form-control-lg"
            required
            name="password"
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, newPassword: e.target.value };
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
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyPassword;
