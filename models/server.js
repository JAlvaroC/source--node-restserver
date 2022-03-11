const express = require("express");
const cors = require("cors");
const fileUpload=require('express-fileupload')

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths={
      auth:'/api/auth',
      search:'/api/search',
      categories:'/api/categories',
      products:'/api/products',
      users:'/api/users',
      uploads:'/api/uploads'

    }


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

    // Note that this option available for versions 1.0.0 and newer. 
    this.app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath:true
    }));


  }
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.search, require('../routes/search'));
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.users, require("../routes/users"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
    
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo https://localhost:8080", this.port);
    });
  }
}

module.exports = Server;
