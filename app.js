const Server = require('./models/server');

require('dotenv').config();
// const app = express();

const server=new Server()

server.listen();
server.routes();

