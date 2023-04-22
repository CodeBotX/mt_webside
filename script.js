const messageInput = document.querySelector('#messageInput');
const sendButton = document.querySelector('#sendButton');
const messagesContainer = document.querySelector('#messages');

let isUser = true;

// Tạo WebSocket object
const socket = new WebSocket('ws://localhost:8080');

// Xử lý sự kiện khi mở kết nối WebSocket
socket.addEventListener('open', event => {
  console.log('WebSocket connected');
});

// Xử lý sự kiện nhận tin nhắn từ server
socket.addEventListener('message', event => {
  const message = event.data;
  const messageContainer = document.createElement('div');
  const messageText = document.createElement('span');

  messageText.textContent = message;
  messageContainer.appendChild(messageText);
  messagesContainer.appendChild(messageContainer);

  messageContainer.classList.add('message-container');

  if (isUser) {
    messageContainer.classList.add('message-container--user');
  } else {
    messageContainer.classList.add('message-container--bot');
  }

  isUser = !isUser;
});

// Xử lý sự kiện gửi tin nhắn
function sendMessage(event) {
  event.preventDefault();
  const message = messageInput.value;
  if (message.trim() === '') return;

  // Gửi tin nhắn lên server qua WebSocket
  socket.send(message);

  if (message.trim().toLowerCase() === 'delete all') {
    messagesContainer.innerHTML = '';
    localStorage.removeItem('messages');
    return;
  }

  const messageContainer = document.createElement('div');
  const messageText = document.createElement('span');

  messageText.textContent = message;
  messageContainer.appendChild(messageText);
  messagesContainer.appendChild(messageContainer);

  messageContainer.classList.add('message-container');

  if (isUser) {
    messageContainer.classList.add('message-container--user');
  } else {
    messageContainer.classList.add('message-container--bot');
  }

  isUser = !isUser;

  messageInput.value = '';
  messageInput.focus();

  // Lưu tin nhắn vào localStorage
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));
}

// Thêm xử lý sự kiện cho nút "Gửi"
sendButton.addEventListener('click', sendMessage);

// Thêm xử lý sự kiện cho phím Enter
messageInput.addEventListener('keydown', event => {
  if (event.keyCode === 13) {
    sendMessage(event);
  }
});

// Lấy tin nhắn đã lưu trong localStorage và hiển thị lên màn hình
const messages = JSON.parse(localStorage.getItem('messages')) || [];
messages.forEach(message => {
  const messageContainer = document.createElement('div');
  const messageText = document.createElement('span');

  messageText.textContent = message;
  messageContainer.appendChild(messageText);
  messagesContainer.appendChild(messageContainer);

  messageContainer.classList.add('message-container');

  if (isUser) {
    messageContainer.classList.add('message-container--user');
  } else {
    messageContainer.classList.add('message-container--bot');
  }

  isUser = !isUser;
});
