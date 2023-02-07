const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const checkHeaders = require("../middleware/headers");

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 5050;
    this.paths = {
      validation: "/api",
    };
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json({ limit: "25mb" }));
    this.app.use(express.urlencoded({ limit: "25mb" }));
    this.app.use(bodyParser.json({ limit: "25mb" }));
    this.app.use(
      bodyParser.urlencoded({
        limit: "25mb",
        extended: true,
        parameterLimit: 25000,
      })
    );
  }

  // connectDB() {
  //   connectMongoDB();
  // }

  routes() {
    this.app.use(this.paths.validation, require("../routes/validation.route"));
  }
  listen() {
    const server = this.app.listen(this.PORT, () => {
      console.log(`the application listening on ${this.PORT}`);
    });
    server.timeout = 1000;
  }
}

module.exports = Server;
