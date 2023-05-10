import Peer from 'peerjs';
import { useEffect, useRef, useState } from 'react';

function App() {
	const [stream, setStream] = useState(null);
	const [peer, setPeer] = useState(null);

	const [localUserId, setLocalUserId] = useState(null);
	const [remoteUserId, setRemoteUserId] = useState(null);

	const videoRef = useRef();
	const remoteVideoRef = useRef();

	useEffect(() => {
		const peer = new Peer();
		setPeer(peer);

		peer.on('open', id => {
			setLocalUserId(id);
		});

		navigator.mediaDevices
			.getUserMedia({ audio: true, video: { width: 200, height: 200 } })
			.then(stream => {
				peer.on('call', call => {
					call.answer(stream);
					call.on(
						'stream',
						remoteStream => {
							console.log('stream success from answer');
							remoteVideoRef.current.srcObject = remoteStream;
						},
						err => console.log(err)
					);
				});

				videoRef.current.srcObject = stream;
				setStream(stream);
			})
			.catch(error => console.log(error));
	}, []);

	const connect = () => {
		const conn = peer.call(remoteUserId, stream);

		conn.on(
			'stream',
			remoteStream => {
				console.log('stream from calling success');
				remoteVideoRef.current.srcObject = remoteStream;
			},
			err => console.log(err)
		);
	};

	return (
		<div>
			<p>Hola</p>
			id: {localUserId ?? 'Connecting...'}
			<br />
			{<video muted autoPlay ref={videoRef} />}
			{<video autoPlay ref={remoteVideoRef} />}
			<input
				value={remoteUserId ?? ''}
				onChange={e => setRemoteUserId(e.target.value)}
			/>
			<button onClick={connect}>Conectar</button>
		</div>
	);
}

export default App;
