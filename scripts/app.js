// Get DOM elements
const messageList = document.querySelector('.message-output');
const addMessage = document.querySelector('.new-message');
const addName = document.querySelector('.new-name');
const successMessage = document.querySelector('.success-message');
const chatButtons = document.querySelector('.chat-buttons');

// Add a message to the chat
addMessage.addEventListener('submit', e => {
	e.preventDefault();
	const message = addMessage.message.value.trim();

	message && chatroom
		.addChat(message)
		.then(() => addMessage.reset())
		.catch(error => console.log(error))
})

// Updated name
addName.addEventListener('submit', e => {
	e.preventDefault();
	const username = addName.username.value.trim();
	if (!username) {
		return;
	}
	
	chatroom.updateName(username);
	addName.reset();

	successMessage.innerHTML = `Name updated to ${username}`;
	setTimeout(() => successMessage.innerHTML = '', 3000);
})

// Update room
chatButtons.addEventListener('click', e => {
	e.preventDefault();
	if (e.target.nodeName === 'BUTTON') {
		chatMessages.clear();
		chatroom.updateRoom(e.target.getAttribute('id'))
		chatroom.getChat(data => {
			chatMessages.render(data);
		})
	}
})

// Define classes
const username = localStorage.username ? localStorage.username : 'anonymous'
const chatMessages = new chatUI(messageList);
const chatroom = new Chatroom(username, 'gaming');

// Get chat data and render
chatroom.getChat(data => {
	chatMessages.render(data);
})