const express = require("express"); // import libery express
const { pool } = require("./src/config/database"); // use pool
const bytes = require("bytes");
const multer = require("multer"); // use multer upload image
const app = express();
const cors = require("cors"); // cai dat goi http
const port = 8081;
const bodyParser = require("body-parser");
const { routerAPIUser } = require("./src/routes/routerAPIUser");
const { routeAPIProduct } = require("./src/routes/routeProduct");
const { routeAPICategory } = require("./src/routes/routeCategory");
const { routeAPICourse } = require("./src/routes/routeCourse");
const { routeAPIEnrolment } = require("./src/routes/routeEnrolment");
const cookieParser = require("cookie-parser");
// const upload = multer({ dest: "./image" });
// bytes.format("2mb");
const corsOptions = {
    origin: "http://localhost:3000", // config 2 duong dan nay
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
app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
});
