import { PORT } from "./v1/common-config/index";
import express from "express";
import cors from "cors";

import v1 from "./v1";

const app = express();
const port = PORT;

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
