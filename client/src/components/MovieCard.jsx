import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const MovieCard = ({ poster, title, duration, slug }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <Card
        style={{ width: "15rem", position: "relative" }}
        className="movie-card bg-dark m-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            backgroundImage: `url(${poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: "3.5px",
            width: "14.5rem",
            height: "20rem",
            color: "white", // Ensures all text appears over the background
          }}
        ></div>

        {/* Overlay div */}
        <div
          style={{
            backgroundColor: isHovered
              ? "rgba(0, 0, 0, 0.5)"
              : "rgba(0, 0, 0, 0.2)",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            transition: "background-color 0.3s ease",
          }}
          className="d-flex align-items-center justify-content-center flex-column"
        >
          <Link to={`/movies/${slug}`} style={{ textDecoration: "none" }}>
            <Button
              variant="danger"
              style={{
                display: isHovered ? "block" : "none",
                marginTop: "10px",
                zIndex: 3,
              }}
            >
              Buy now
            </Button>
          </Link>
          <Button
            variant="primary"
            style={{
              display: isHovered ? "block" : "none",
              marginTop: "10px",
              zIndex: 3,
            }}
          >
            Add to cart
          </Button>
        </div>

        <Card.Body
          style={{ position: "relative", zIndex: 2 }}
          className="text-white"
        >
          <Card.Title>{title}</Card.Title>
          <Card.Text className="text-white-50">{duration}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieCard;
