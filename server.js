require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json()); // support json encoded boies
// you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/generation", require("./routes/qrGeneration"));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
