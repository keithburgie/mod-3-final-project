document.addEventListener('DOMContentLoaded', init)

const API = "http://localhost:3000/api/v1/",
  USERS_API = API + "users",
  CONVO_API = API + "conversations",
  MESSAGE_API = API + "messages"

let LOGGED_IN_USER // set by: fetchRandomUser() -> setUser(user)
let CONVERSATION // set by: fetchRandomConversation() -> SetConversation(convo)

function init() {
  fetchRandomUser()
  fetchRandomConversation()
  form().addEventListener('submit', postMessage)
}

/* Users
-----------------------------------------------------------*/
const fetchUsers = () => {
  return fetch(USERS_API).then(r => r.json())
},

fetchRandomUser = () => {
  fetchUsers().then(users => setUser(users[randomize(users)]))
},

setUser = (user) => {
  LOGGED_IN_USER = user
  userName().innerText = LOGGED_IN_USER.username
},

// setUser = (user) => {
//   LOGGED_IN_USER = user
//   myName().innerText = LOGGED_IN_USER.username
// },

createUser = () => {/* TODO */},
editUser = () => {/* TODO */}

/* Conversations
-----------------------------------------------------------*/
const fetchConversations = () => {
  return fetch(CONVO_API).then(r => r.json())
},

fetchRandomConversation = () => {
  fetchConversations().then(convos => setConversation(convos[randomize(convos)]))
},

setConversation = (convo) => {
  CONVERSATION = convo
  convoName().innerText = CONVERSATION.name
  convo.messages.forEach(message => appendMessage(message))
},

createConversation = () => {/* TODO */}

/* Messages
-----------------------------------------------------------*/
const appendMessage = (message) => {
  const {username, content, created_at:timestamp} = message
  const li = document.createElement('li')
  li.innerHTML = `
  <p><strong>${username}</strong> <span class="timestamp">${moment(timestamp).calendar()}</span></p>
  <p>${content}</p>`
  chatStream().appendChild(li)
},

postMessage = () => {
  event.preventDefault()

  fetch(MESSAGE_API, { method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      conversation_id: CONVERSATION.id,
      user_id: LOGGED_IN_USER.id,
      content: input().value,
      created_at: Date.now(),
      username: LOGGED_IN_USER.username
    })
  }).then(r => r.json())
  .then(message => {
    appendMessage(message)
    form().reset()
    input().focus()
  })
},

editMessage = (message) => {/* TODO */},
deleteMessage = (message) => {/* TODO */}

/* Selectors
-----------------------------------------------------------*/
const form = () => document.getElementById('message-form')
const input = () => form().querySelector('input')
const chatStream = () => document.getElementById('chat-stream')
const randomize = array => Math.floor(Math.random()*array.length)
const convoName = () => document.getElementById('conversation-name')
// const myName = () => document.getElementById('my-name')
const userName = array => document.getElementById('username')