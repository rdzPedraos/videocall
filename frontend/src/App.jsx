import Peer from 'peerjs';
import { useEffect, useRef, useState } from 'react';

function App() {
	const [stream, setStream] = useState(null);
	const [peer, setPeer] = useState(null);
	const [remoteStream, setRemoteStream] = useState(null);
	const [userId, setUserId] = useState(null);
	const videoRef = useRef(null);
	const remoteVideoRef = useRef(null);

	useEffect(() => {
		const peer = new Peer();
		peer.on('open', id => {
			console.log('id de peer: ', id);
		});

		navigator.mediaDevices &&
			navigator.mediaDevices
				.getUserMedia({ audio: true, video: true })
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

		setPeer(peer);
	}, []);

	const connect = () => {
		const conn = peer.call(userId, stream);
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
			id: {peer ? peer._id : 'nothing'}
			<br />
			{videoRef && <video muted autoPlay ref={videoRef} />}
			{remoteVideoRef && <video muted autoPlay ref={remoteVideoRef} />}
			<input value={userId ?? ''} onChange={e => setUserId(e.target.value)} />
			<button onClick={connect}>Conectar</button>
		</div>
	);
}

export default App;
