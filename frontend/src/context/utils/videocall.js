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
		console.log('CALL CLOSED*');
		call.close();
		setRemoteUser(null);
	});
}

export { setCallConfiguration };
