const express = require("express");
const cors = require("cors");

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
    this.app.use(express.json());
  }

  // connectDB() {
  //   connectMongoDB();
  // }

  routes() {
    this.app.use(this.paths.validation, require("../routes/validation.route"));
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`the application listening on ${this.PORT}`);
    });
  }
}

module.exports = Server;
