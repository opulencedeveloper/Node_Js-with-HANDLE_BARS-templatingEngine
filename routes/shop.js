const path = require("path");

const rootDir = require("../util/path");
const adminData = require("./admin");

const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  //since we have already defined a path to where to templating engine files is stored
  //in app.js. we just name the name of the templating engine here, in the first argument below,
  //the second argument is the data we are passing to this view
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
    //Handlebar gives us this key(layout), if you set it to false, then this view won't use the layout, in the layouts folder
    //else it will be set to true by default, and layout will be used by default
    //layout: false
  });
  //don't call next after you've sent a response becus this will cause an error
  //as sending a response means closing the process
});

module.exports = router;