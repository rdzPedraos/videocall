class User {
	constructor(id, peerId) {
		this.id = id;
		this.peerId = peerId;
		this.connection = null;
	}

	isConnected() {
		return this.connection !== null;
	}

	connect(user) {
		this.connection = user.id;
		user.connection = this.id;
	}

	disconnect() {
		this.connection = null;
	}
}

module.exports = User;
