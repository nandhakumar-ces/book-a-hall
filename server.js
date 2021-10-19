import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/rootRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(cors());
app.use("/user", router);

const CONNECTION_URL =
  "mongodb+srv://nandhakumar-ces:mlpzaq@cluster0.ja0us.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, console.log(`Server is running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));
