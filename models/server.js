const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    //connect to database
    this.conectaDB();

    //middleweares
    this.middlewares();

    //routes of my app
    this.routes();
  }

  async conectaDB() {
    await dbConnection();
  }
  middlewares() {
    //CORS
    this.app.use(cors());

    //read and parse the body
    this.app.use(express.json());

    //public directory
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.usersPath, require("../routes/users"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo http://localhost:8080", this.port);
    });
  }
}

module.exports = Server;
