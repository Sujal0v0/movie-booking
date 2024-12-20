import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import logo from "../assets/bookamovie.svg";

const UserFooter = () => {
  const handleImageErr = (e) => {
    e.target.src =
      "https://i.pinimg.com/736x/c2/5a/83/c25a838aa58df060864f44400b945b3b.jpg";
  };
  return (
    <footer className="page-footer font-small blue pt-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <hr className="clearfix w-100 pb-0" />
          <div className="d-flex align-items-center justify-content-center mb-4 mt-2 gap-4">
            <a href="https://www.facebook.com/sujal.bajr/">
              <FaFacebookF color="black" size="1.7em" />
            </a>
            <a href="https://www.instagram.com/sujal_bajracharya__/">
              <FaInstagram color="black" size="1.7em" />
            </a>
            <a href="https://www.linkedin.com/in/sujal-bajracharya-331888210/">
              <FaLinkedin color="black" size="1.7em" />
            </a>
            <a href="https://github.com/Sujal0v0">
              <FaGithub color="black" size="1.7em" />
            </a>
          </div>
          <img
            src={logo}
            alt="logo"
            className="center"
            style={{
              height: "45px",
              paddingBottom: "15px",
            }}
            onError={(e) => {
              handleImageErr(e);
            }}
          />
          <div className="col-md-6 mt-md-0 mt-1 mb-2">
            <h5 className="text-uppercase">Movie Booking Website</h5>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Our Websites</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" style={{ color: "grey" }}>
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" style={{ color: "grey" }}>
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" style={{ color: "grey" }}>
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" style={{ color: "grey" }}>
                  Link 4
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center py-3">
        © 2024 Copyright:
        <a href="https://mdbootstrap.com/"> website.com</a>
      </div>
    </footer>
  );
};

export default UserFooter;
