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
    extname: "hbs",
    defaultLayout: "main-layout",
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.render("404", { pageTitle: "404" });
});

app.listen(3000);
