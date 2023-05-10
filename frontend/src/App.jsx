import Peer from 'peerjs';
import { useEffect, useMemo, useState } from 'react';

import Video from './components/Video';
import Profile from './components/Profile';
import Button from './components/Button';

function App() {
	const [localStream, setLocalStream] = useState(null);
	const [remoteStream, setRemoteStream] = useState(null);

	const [localUserId, setLocalUserId] = useState(null);
	const [remoteUserId, setRemoteUserId] = useState(null);

	const [name, setName] = useState('');

	const peer = useMemo(() => new Peer(), []);
	peer.on('open', id => {
		setLocalUserId(id);
	});

	useEffect(() => {
		if (navigator.mediaDevices) {
			navigator.mediaDevices
				.getUserMedia({ audio: true, video: { width: 1280, height: 1280 } })
				.then(stream => {
					setLocalStream(stream);
				})
				.catch(error => console.log(error));
		}
	}, []);

	useEffect(() => {
		peer.on('call', call => {
			call.answer(localStream);

			call.on(
				'stream',
				remoteStream => setRemoteStream(remoteStream),
				err => console.log(err)
			);
		});
	}, [peer, localStream]);

	return (
		<>
			{navigator.mediaDevices ? (
				<>
					<p className='text-red-500'>Hola</p>
					id: {localUserId ?? 'Connecting...'}
					<br />
					<div className='lg:flex gap-4 p-6 mx-12'>
						<Profile
							className='flex-1 flex-grow'
							name={name}
							onChangeName={name => setName(name)}
							editByDefault={true}
							stream={localStream}
							mutedVideo={true}
						/>

						<Profile
							className='flex-1 flex-grow'
							name='Carlitos'
							stream={remoteStream}
						/>
					</div>
					<Button variant='danger'>asdasdasd</Button>
				</>
			) : (
				<p>Ha ocurrido un error! </p>
			)}
		</>
	);
}

export default App;
