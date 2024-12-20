import { useState, useCallback } from "react";
import MovieServices from "../services/movies.js";

export const useMovies = () => {
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState("");

  const getAllMovies = useCallback(async ({ limit, page, title }) => {
    try {
      setLoading(true);
      const data = await MovieServices.list(limit, page, title);
      setData(data.data);
      setMsg(data.message);
      return data.data;
    } catch (error) {
      const errMsg = error.response.data.message || "Something went wrong!";
      setError(errMsg);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
        setMsg("");
      }, 2000);
    }
  }, []);
  const getBySlug = async (slug) => {
    try {
      setLoading(true);
      const result = await MovieServices.getBySlug(slug);
      setMovie(result.data);
      setMsg(result.message);
      return result.data;
    } catch (error) {
      const errMsg = error.response.data.message || "Something went wrong!";
      setError(errMsg);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMsg("");
        setData("");
      }, 2000);
    }
  };

  return { data, movie, error, msg, loading, getAllMovies, getBySlug };
};
