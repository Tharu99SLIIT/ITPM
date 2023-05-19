const express = require("express");
const dotenv = require("dotenv");
const logger = require("pino")();
const mongoose = require("mongoose");
const cors = require("cors");
const expressSession = require("express-session");

// Import routes to here
const userRoutes = require("./routes/userManageRoutes");

const labRoutes = require("./routes/labRoutes");

const AdsRoutes = require("./routes/AdsRoutes");

//const labRoutes = require("./routes/labRoutes.js");

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.set("trust proxy", 1);
const sessSettings = expressSession({
  path: "/",
  secret: "oursecret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    sameSite: false,
    secure: false,
    maxAge: 360000,
  },
});

app.use(sessSettings);
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  logger.info(" Mongodb connected successfully");
});

app.get("/", (req, res) => {
  res.status(200).json({ messsage: "Server is running!" });
});

// Implement the routes from here
app.use("/api/users", userRoutes);




app.use("/api/lab", labRoutes);


// Health Care Appointments



app.use("/api/Ads", require("./routes/AdsRoutes"));


app.listen(PORT, () => {
  logger.info(`Server is running on PORT: ${PORT}`);
});
