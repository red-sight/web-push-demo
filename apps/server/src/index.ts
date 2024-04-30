import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.send(200);
});

app.listen(3000, () => {
  console.log("Server is running");
});
