class User {
	constructor(id, peerId, { name, audio = true, video = true }) {
		this.id = id;
		this.peerId = peerId;

		this.name = name;
		this.video = video;
		this.audio = audio;

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

	setAudio(audio) {
		this.audio = audio;
	}

	setVideo(video) {
		this.video = video;
	}

	setData({ name, audio, video }) {
		if (name !== undefined) this.setName(name);
		if (audio !== undefined) this.setAudio(audio);
		if (video !== undefined) this.setVideo(video);
	}
}

module.exports = User;
