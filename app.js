const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");

const rootDir = require("./util/path");


const app = express();

app.engine(
  "hbs",
  handlebars({
    layoutsDir: __dirname + "/views/layouts", 
    extname: 'hbs',
    defaultLayout: 'main-layout',
  })
);

app.set("view engine", "hbs");
app.set('views', 'views');

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  //since we have already defined a path to where to templating engine files is stored
  //at the top of this file, we just name the name of the templating engine here in the first argument below,
  //the second argument is the data we are passing to this view
  res.render("404", { pageTitle: "404" });
  //don't call next after you've sent a response becus this will cause an error
  //as sending a response means closing the process
});

app.listen(3000);
