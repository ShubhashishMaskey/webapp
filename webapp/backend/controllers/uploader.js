require("dotenv").config();
const cloudinary = require("cloudinary");
const cloudinary_storage = require("multer-storage-cloudinary");

//configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//storing image to cloudinary using multer
cloudinary_storage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "jpeg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
  resource_type: ["image", "raw"]
});

const Uploader = async (req, res, file, next, type) => {
  if (type === "update") {
    if (file && file.originalname && file.buffer) {
      cloudinary.v2.uploader
        .upload_stream({ resource_type: "image" }, function(error, result) {
          if (error) console.log("Error : " + error);
          else {
            req.body.images = result.secure_url; //assigning url as a value for images
            next();
          }
        })
        .end(file.buffer);
    } else {
      req.body.images = res.images;
      next();
    }
  } else if (type === "post" && file && file.originalname && file.buffer) {
    cloudinary.v2.uploader
      .upload_stream({ resource_type: "image" }, function(error, result) {
        if (error) console.log("Error : " + error);
        else {
          req.body.images = result.secure_url; //assigning url as a value for images
          next();
        }
      })
      .end(file.buffer);
  } else {
    req.body.images =
      "https://res.cloudinary.com/doo4zgtkg/image/upload/v1581612780/covernotavailable.jpg";
    next();
  }
};

module.exports = { Uploader }; //curly braces because of async function
