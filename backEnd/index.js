const express = require("express"); // import libery express
const { pool } = require("./src/config/database"); // use pool
const bytes = require("bytes");
const multer = require("multer"); // use multer upload image
const app = express();
const cors = require("cors"); // cai dat goi http
// const port = process.env.PORT || 8081;
const port = 8081;
const bodyParser = require("body-parser");
const { routerAPIUser } = require("./src/routes/routerAPIUser");
const { routeAPIProduct } = require("./src/routes/routeProduct");
const { routeAPICategory } = require("./src/routes/routeCategory");
const { routeAPICourse } = require("./src/routes/routeCourse");
const { routeAPIEnrolment } = require("./src/routes/routeEnrolment");
const { routerComment } = require("./src/routes/routeComment");
const cookieParser = require("cookie-parser");
const corsOptions = {
    origin: [process.env.URL_FRONTEND],
    credentials: true,
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// running server
app.use("/", routerAPIUser);
app.use("/product", routeAPIProduct);
app.use("/category", routeAPICategory);
app.use("/course", routeAPICourse);
app.use("/enrolment", routeAPIEnrolment);
app.use("/comment", routerComment);
app.listen(port, async () => {
    // console.log("connect server success !");
    // console.log(`on port ${port}`);
});
