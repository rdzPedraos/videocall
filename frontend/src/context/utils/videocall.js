function setCallConfiguration(socket, call, setRemoteUser) {
	call.on(
		'stream',
		stream => {
			console.log('CALL CONNECTED*');

			setRemoteUser(pre => ({ ...pre, stream }));
		},
		err => console.log({ err })
	);

	socket.on('closeCall', () => {
		call.close();
		setRemoteUser(null);
	});

	call.on('close', () => {
		console.log('CALL CLOSED*');

		setRemoteUser(null);
	});
}

export { setCallConfiguration };
