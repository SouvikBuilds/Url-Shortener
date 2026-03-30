import express, { urlencoded } from "express";
import urlRouter from "./routes/url.route.js";
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello World ! </h1>");
});

app.use(express.json());
app.use("/api/v1/url", urlRouter);
export default app;
