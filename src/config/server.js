const port = 3003;

const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

server.listen(port, () => console.log(`Backend is running on the port: ${port}`))

module.exports = server;