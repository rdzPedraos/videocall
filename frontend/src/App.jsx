import Peer from "peerjs";
import { useEffect, useMemo, useState } from "react";

import Profile from "./Components/Profile";
import ButtonsGroup from "./partials/ButtonsGroup";
import Error from "./partials/Error";

function App() {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);

    const [localUserId, setLocalUserId] = useState(null);
    const [remoteUserId, setRemoteUserId] = useState(null);

    const [name, setName] = useState("");

    const peer = useMemo(() => new Peer(), []);
    peer.on("open", (id) => {
        setLocalUserId(id);
    });

    useEffect(() => {
        if (navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                    video: { width: 1280, height: 1280 },
                })
                .then((stream) => {
                    setLocalStream(stream);
                })
                .catch((error) => console.log(error));
        }
    }, []);

    useEffect(() => {
        peer.on("call", (call) => {
            call.answer(localStream);

            call.on(
                "stream",
                (remoteStream) => setRemoteStream(remoteStream),
                (err) => console.log(err)
            );
        });
    }, [peer, localStream]);

    return navigator.mediaDevices ? (
        <>
            <section className="lg:flex lg:w-2/3 lg:min-h-[200px] lg:gap-4 m-auto mt-16 bg-red-200">
                {/* los videos no toman el tamaño del padre D: */}
                <Profile
                    className="flex-1"
                    name={name}
                    onChangeName={(name) => setName(name)}
                    editByDefault={true}
                    stream={localStream}
                    mutedVideo={true}
                />
                <Profile
                    className="flex-1"
                    name="Carlitos"
                    stream={remoteStream}
                />
            </section>

            <section className="flex justify-center mt-16">
                <ButtonsGroup />
            </section>
        </>
    ) : (
        <Error
            http={400}
            description="No se puede mostrar el contenido si no autorizas el acceso a la cámara y el micrófono :("
        />
    );
}

export default App;
