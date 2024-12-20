import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies.js";

const MovieDetail = () => {
  const { pathname } = useLocation();
  const { movie, getBySlug } = useMovies();
  useEffect(() => {
    console.log(pathname);

    const movieSlug = pathname.split("/")[2];
    getBySlug(movieSlug);
  }, [pathname]);
  console.log(movie);
  return (
    <div className="container d-flex align-items-center justify-content-center min-vw-100 p-5 ">
      <div className="card">
        <div className="container-fliud">
          <div className="wrapper row">
            <div className="preview col-md-6">
              <img src="http://placekitten.com/400/252" />
            </div>
            <div className="details col-md-6">
              <h2 className="product-title">men's shoes fashion</h2>
              <p className="product-description">
                Suspendisse quos? Tempus cras iure temporibus? Eu laudantium
                cubilia sem sem! Repudiandae et! Massa senectus enim minim
                sociosqu delectus posuere.
              </p>
              <h3 className="price">
                Price: <span>$180</span>
              </h3>

              <Button>Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
