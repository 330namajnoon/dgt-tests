const router = require("./router");
const { Server } = require("sm-express-server");
const express = require("express");
const path = require("path");

const server = new Server(process.env.PORT || 3000, "./", [express.json(), express.static(path.join(__dirname, "../public/dist/"))], [router], []);

server.start(() => {
    console.log(`Server is running on port ${server.port}`);
});
