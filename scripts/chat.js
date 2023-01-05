// adding new chat documents
// setting up new real-time listener to get new chat
// updating the username
// updating the room


class Chatroom {
	constructor(username, room) {
		this.username = username;
		this.room = room;
		this.chats = db.collection('chats');
		this.unsub;
	}
	async addChat(message) {
		const now = new Date();
		const chat = {
			message,
			username: this.username,
			room: this.room,
			created_at: firebase.firestore.Timestamp.fromDate(now)
		}

		const response = await this.chats.add(chat);
		return response;
	}
	getChat(callback) {
		this.unsub = this.chats
		.where('room', '==', this.room)
		.orderBy('created_at')
		.onSnapshot(snapshot => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === "added") {
					callback(change.doc.data());
				}
			})
		})
	}
	updateName(username) {
		this.username = username;
		localStorage.setItem('username', this.username);
	}
	updateRoom(room) {
		this.room = room;
		this.unsub && this.unsub();
	}
}