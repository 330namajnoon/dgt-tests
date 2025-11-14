const router = require("./router");
const { Server } = require("sm-express-server");
const express = require("express");

const server = new Server(process.env.PORT || 3000, "./", [express.json()], [router], []);

server.start(() => {
    console.log(`Server is running on port ${server.port}`);
});
