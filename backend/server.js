require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const app = express();
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
const swaggerui = require("swagger-ui-express");

app.use(cors());
app.use(express.json()); // support json encoded boies
// you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Freight Data Processor",
      version: "1.0.0",
      description: "My API description",
    },
    servers: [
      {
        url: "http://localhost:5000/",
        description: "Development server",
      },
    ],
  },
  apis: [path.join(__dirname, "/routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerSpec));

app.use("/api/generation", require("./routes/qrGeneration"));
app.use("/api/event", require("./routes/epicEvent"));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
