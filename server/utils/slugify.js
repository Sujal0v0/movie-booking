import slugify from "slugify";

const slugger = (text) => {
  return slugify(text, {
    replacement: "-",
    lower: true,
    trim: true,
  });
};

export default slugger;
