import React, { useEffect, useRef, useState } from "react";

import { Peer } from "peerjs";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
    const [myVideoRef, userVideoRef, connectionRef] = [
        useRef(),
        useRef(),
        useRef(),
    ];
    const [socketId, setSocketId] = useState(null);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((stream) => {
                myVideoRef.current.srcObject = stream;
            })
            .catch((error) => {
                console.log(error);
            });
    }, [myVideoRef]);

    return (
        <div>
            <p>Hola</p>

            <p>MI ID</p>
            <p>{socketId}</p>

            <p>Mi Cámara:</p>
            <video playsInline muted ref={myVideoRef} autoPlay />
        </div>
    );
}

export default App;
