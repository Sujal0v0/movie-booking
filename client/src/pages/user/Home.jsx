import { useEffect, useState } from "react";
import { useMovies } from "../../hooks/useMovies.js";
import MovieCard from "../../components/MovieCard.jsx";
import Form from "react-bootstrap/Form";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/esm/Button.js";

const Home = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const { data, movie, error, msg, loading, getAllMovies, getBySlug } =
    useMovies();

  const getTopMovies = () => data?.data?.movies?.slice(0, 8) || [];

  useEffect(() => {
    // Fetch movies only initially or when limit or page changes, not on every title change
    getAllMovies({ limit, page, title });
  }, [limit, page, title, getAllMovies]);

  return (
    <div className="m-0 " style={{ width: "98.9vw", overflowX: "hidden" }}>
      <Carousel
        className="bg-black mb-5 mx-0"
        style={{ width: "100vw", height: "80vh", overflowX: "hidden" }}
      >
        {getTopMovies().map((movie) => (
          <Carousel.Item key={movie.slug}>
            <div
              className="row featurette d-flex align-items-center justify-content-center text-white"
              style={{ minHeight: "80vh" }}
            >
              <div className="col-md-7 order-md-2">
                <h2 className="featurette-heading">{movie?.title}</h2>
                <p className="lead">{movie?.synopsis}</p>
              </div>
              <div className="col-md-5 order-md-1">
                <img
                  src={movie?.poster}
                  alt={movie?.title}
                  style={{ height: "80vh", padding: "20px" }}
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Search Form */}
      <Form
        className="d-flex me-4 align-items-center justify-content-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2 w-25 border-2"
          aria-label="Search"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }} // Update title state directly
        />
        <Button variant="success">Search</Button>
      </Form>

      <h1 style={{ fontFamily: "Roboto" }} className="m-4">
        Now Showing
      </h1>
      <div className="d-flex flex-wrap">
        {data?.data?.movies?.length > 0 ? (
          data.data.movies.map((movie) => (
            <MovieCard
              poster={movie?.poster}
              title={movie?.title}
              duration={movie?.duration}
              slug={movie?.slug}
              key={movie?.slug}
            />
          ))
        ) : (
          <div>No movies</div>
        )}
      </div>
    </div>
  );
};

export default Home;
