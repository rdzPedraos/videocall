const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", (data) => {
        console.log("ENTRE");
        io.to(data.userToCall).emit("callUser", {
            signal: data.signalData,
            from: data.from,
            name: data.name,
        });

        socket.on("answerCall", (data) => {
            io.to(data.to).emit("callAccepted", data.signal);
        });
    });
});

server.listen(5000, () => {
    console.log("Server is running on port 5000");
});
