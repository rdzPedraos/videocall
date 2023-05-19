class User {
	constructor(id, peerId, name) {
		this.id = id;
		this.peerId = peerId;
		this.name = name;
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

	setName(name) {
		this.name = name;
	}
}

module.exports = User;
