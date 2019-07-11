document.addEventListener('DOMContentLoaded', init)

const API = "http://localhost:3000/api/v1/",
  USERS_API = API + "users",
  CONVO_API = API + "conversations",
  MESSAGE_API = API + "messages"

let USER_COOKIE
let LOGGED_IN_USER // set by: fetchRandomUser() -> setUser(user)
let CONVERSATION // set by: fetchRandomConversation() -> SetConversation(convo)

function init() {
  if (LOGGED_IN_USER == null){
    showLoginForm()
  }
  //fetchRandomUser()
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

/* Login Form
-----------------------------------------------------------*/
const showLoginForm = () => {
  modal().classList.remove('hide')
},

login = () => {
  const userInput = loginForm().querySelector('input[type="text"]').value
  const passInput = loginForm().querySelector('input[type="password"]').value
  const checkbox = loginForm().querySelector('input[type="checkbox"]')

  fetchUsers().then(users => findUser(users, userInput, passInput, checkbox))
  .then(modal().classList.add('hide'))
  
  const findUser = (users, userInput, passInput, checkbox) => {
    if (users.find(user => user.username == userInput)) {
      if (passInput == "password") {
        const user = users.find(user => user.username == userInput)
        setUser(user)
        messageInput().focus()
        // TO DO: Cookie to save logged in user
        //checkbox.checked ? document.cookie = LOGGED_IN_USER : document.cookie = null
      } else {
        alert("password is incorrect")
        loginForm().querySelector('input[type="password"]').focus()
      }
    } else {
      alert("user does not exist")
      loginForm().reset()
      loginForm().querySelector('input[type="text"]').focus()
    }
  }
}

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
      content: messageInput().value,
      created_at: Date.now(),
      username: LOGGED_IN_USER.username
    })
  }).then(r => r.json())
  .then(message => {
    appendMessage(message)
    form().reset()
    messageInput().focus()
  })
},

editMessage = (message) => {/* TODO */},
deleteMessage = (message) => {/* TODO */}

/* Selectors
-----------------------------------------------------------*/
const form = () => document.getElementById('message-form')
const messageInput = () => form().querySelector('input')
const chatStream = () => document.getElementById('chat-stream')
const randomize = array => Math.floor(Math.random()*array.length)
const convoName = () => document.getElementById('conversation-name')
const myName = () => document.getElementById('my-name')
const modal = () => document.querySelector('.modal')
const loginForm = () => document.getElementById('login-form')
