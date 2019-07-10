const LOGGED_IN_USER = () => {
  fetch("http://localhost:3000/api/v1/users")
  then(r => r.json()).then(data => {
    console.log(data)
  })
} 

document.addEventListener('DOMContentLoaded', init)

function init() {
  fetchConversation(1)
  document.getElementById('message-form').addEventListener('submit', postMessage)
}

const fetchConversation = (conversation_id) => {
  fetch(`http://localhost:3000/api/v1/conversations/${conversation_id}`)
  .then(r => r.json()).then(conversation => {
    conversation.messages.forEach(message => appendMessage(message))
  })
},

postMessage = () => {
  event.preventDefault()
  const input = event.target.querySelector('input[type="text"]')

  const data = {
    content: input.value,
    created_at: Date.now(),
    user: 37
  }
  fetch(`http://localhost:3000/api/v1/messages`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
}


const appendMessage = (message) => {
  const {content, created_at: timestamp, user} = message
  const li = document.createElement('li')
  li.innerHTML = `
  <p><strong>${user.username}</strong> <span class="timestamp">${timestamp}</span></p>
  <p>${content}</p>`

  chatStream().appendChild(li)
}

const sendMessage = () => {

}

const form = () => document.querySelector('form')
const chatStream = () => document.getElementById('chat-stream')