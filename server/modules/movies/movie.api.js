import express from "express";
import movieController from "./movie.controller.js";
import validator from "./movie.validator.js";
import { secure } from "../../utils/secure.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/movies");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname.concat(
        "-",
        Date.now(),
        ".",
        file.originalname.split(".")[1]
      )
    );
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { page, limit, title } = req.query;
    const search = { title };
    const result = await movieController.list({ page, limit, search });
    console.log(result);
    if (result && result.poster) {
      result.poster = result.poster.replace(/^public[\\/]/, "/");
      console.log(result.poster);
    }
    res.json({ message: "Listed all movies successfully.", data: result });
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await movieController.getBySlug(slug);

    if (result && result.poster) {
      result.poster = result.poster.replace(/^public[\\/]/, "/");
      console.log(result.poster);
    }

    res.json({
      message: `Movie of with slug ${slug} displayed successfully.`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  secure(["admin"]),
  upload.single("poster"),
  (req, res, next) => {
    try {
      if (req.file) {
        req.body.poster = req.file.path;
        // .replace(/^public\//, "");
      }
      next();
    } catch (e) {
      next(error);
    }
  },
  validator,
  async (req, res, next) => {
    try {
      req.body.createdBy = req.currentUser;
      const result = await movieController.create(req.body);
      res.json({ message: "Added new movie successfully.", data: result });
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:slug", secure(["admin"]), async (req, res, next) => {
  try {
    const { slug } = req.params;
    req.body.modifiedBy = req.currentUser;
    const result = await movieController.update(slug, req.body);
    res.json({
      message: `Updated movie with slug ${slug} successfully.`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});
router.delete("/:slug", secure(["admin"]), async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await movieController.removeMovie(slug);
    res.json({
      message: `Deleted movie with slug ${slug} successfully.`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:slug/seat", secure(["admin"]), async (req, res, next) => {
  try {
    const { slug } = req.params;
    req.body.modifiedBy = req.currentUser;
    const result = await movieController.updateSeats(slug, req.body);
    res.json({
      message: `Updated seat for movie with slug ${slug} successfully.`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:slug/release", secure(["admin"]), async (req, res, next) => {
  try {
    const slug = req.params;
    req.body.modifiedBy = req.currentUser;
    const result = await movieController.updateReleaseDate(slug, req.body);
    res.json({
      message: `Updated release date for movie with slug ${slug} successfully.`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

/*
Create 
Update
Delete
List
Update seats for one movie
Change release date
*/

export default router;
