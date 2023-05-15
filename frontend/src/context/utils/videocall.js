function setCallConfiguration(socket, call, setRemoteUser) {
	call.on(
		'stream',
		stream => {
			console.log('CALL CONNECTED*');
			setRemoteUser(pre => ({ ...pre, stream }));
		},
		err => console.log({ err })
	);

	call.on('close', () => {
		console.log('CALL CLOSED*');
		setRemoteUser(null);
	});

	socket.on('closeCall', () => {
		call.close();
	});
}

export { setCallConfiguration };
