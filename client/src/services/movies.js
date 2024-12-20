import { instance } from "../utils/axios.js";

import { APIs } from "../constants/index.js";
import { getToken } from "../utils/storage.js";
const create = (payload) => {
  return instance.post(APIs.MOVIES, payload, {
    headers: {
      token: getToken("token"),
      "Content-Type": "multipart/form-data",
    },
  });
};

const list = (limit, page, title) => {
  return instance.get(
    `${APIs.MOVIES}?limit=${limit}&page=${page}&title=${title}`
  );
};

const getBySlug = (slug) => {
  return instance.get(`${APIs.MOVIES}/${slug}`);
};

const update = (id, payload) => {};

const patchSeat = () => {};

const patchReleaseDate = () => {};

const removeMovie = () => {};

const MovieServices = {
  create,
  list,
  getBySlug,
  update,
  patchSeat,
  patchReleaseDate,
  removeMovie,
};

export default MovieServices;
