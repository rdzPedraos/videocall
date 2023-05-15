function setCallConfiguration(socket, call, setRemoteUser) {
	console.log(socket, call);

	call.on(
		'stream',
		stream => {
			console.log('---- conexión ----');
			console.log(stream);
			setRemoteUser(pre => ({ ...pre, stream }));
		},
		err => console.log({ err })
	);

	socket.on('closeCall', () => {
		call.close();
		setRemoteUser({});
	});

	call.on('close', () => {
		setRemoteUser({});
	});
}

export { setCallConfiguration };
