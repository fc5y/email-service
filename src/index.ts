import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import v1 from "./v1";

const app = express();
const port = process.env.PORT || 8017;

app.set("json spaces", 2);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    service_name: "email_service",
  });
});

app.use("/email/v1", v1);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
