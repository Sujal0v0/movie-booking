import React from "react";
import "./ErrorPage.css";
import confused404 from "../assets/confused404.svg";
const ErrorPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="fw-bolder" style={{ fontSize: "150px" }}>
          4
          <img
            src={confused404}
            style={{ width: "130px", height: "130px", marginBottom: "30px" }}
          ></img>
          4
        </h1>
        <h2 className="fw-bold">Oops! You&apos;re lost.</h2>
        <h5>The page you are looking for was not found</h5>
        <button
          type="button"
          className="btn btn-dark rounded-pill fs-4 mt-5 px-4"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
