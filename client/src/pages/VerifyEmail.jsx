import logo from "../assets/bookamovie.svg";

const VerifyEmail = () => {
  const handleImageErr = (e) => {
    e.target.src =
      "https://i.pinimg.com/736x/c2/5a/83/c25a838aa58df060864f44400b945b3b.jpg";
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="px-5 pt-5 text-center "
        style={{ boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px " }}
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
          Verify Email
        </h5>
        {/* {error && <Notify message={error} />}
                {msg && <Notify variant="alert-success" message={msg} />} */}
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
          <label className="form-label">Token</label>
          <input
            type="text"
            className="form-control form-control-lg"
            required
            name="token"
          />
          <small className="text-muted" style={{ fontSize: "13px" }}>
            Token is sent to email
          </small>
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

export default VerifyEmail;
