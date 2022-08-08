const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//---------------------- body parser -----------------------------
const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
//---------------------------------------------------

//routes
const userRouter = require("./routes/user-routes");
const authRouter = require("./routes/auth-routes");
// const productRouter = require('./routes/productRoutes');
// const reviewRouter = require('./routes/reviewRoutes');
// const orderRouter = require('./routes/orderRoutes');

// middleware

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

// routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3200;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
