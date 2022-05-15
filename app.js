import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";


const port = process.env.PORT || "3001";
const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.get("/", (req, res) => {
  res.send("Welcome!");
});



app.all("*", (req, res) => {
  return res.sendStatus(404);
});
app.listen(port, () => {
  console.log(`API Running on Port ${port}`);
});

try {
  console.log("Connecting to MongoDB Atlas cluster...");
  mongoose.connect(process.env.MONGOURL, {
    useUnifiedTopology: true,
    socketTimeoutMS: 75000,
  });
  console.log("Successfully connected to MongoDB Atlas!");
} catch (error) {
  console.error("Connection to MongoDB Atlas failed!", error);
  process.exit();
}

export default app;
