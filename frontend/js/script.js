document.addEventListener('DOMContentLoaded', init)

const API = "http://localhost:3000/api/v1/",
  USERS_API = API + "users",
  CONVO_API = API + "conversations",
  MESSAGE_API = API + "messages"

let LOGGED_IN_USER
let CONVERSATION // set by: fetchRandomConversation() -> SetConversation(convo)

function init() {
  checkSession()
  fetchRandomConversation()
  form().addEventListener('submit', postMessage)
}

/* Sessions
-----------------------------------------------------------*/
const checkSession = () => {
  const id = sessionStorage.getItem("user_session")
  id == null ? showLoginForm() : fetchUser(id)
}


/* Users
-----------------------------------------------------------*/
fetchUser = (id) => {
  return fetch(`${USERS_API}/${id}`).then(r => r.json()).then(user => setUser(user))
},

fetchUsers = () => {
  return fetch(USERS_API).then(r => r.json())
},

setUser = (user) => {
  LOGGED_IN_USER = user
  myName().innerHTML = `${LOGGED_IN_USER.username} 
  <button data-id="${LOGGED_IN_USER.id}" onclick="logout()">Logout</button>`
},
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
  
  const findUser = (users, userInput, passInput, checkbox) => {
    if (users.find(user => user.username == userInput)) {
      if (passInput == "password") {
        const user = users.find(user => user.username == userInput)
        sessionStorage.setItem("user_session", user.id)
        checkSession()
        modal().classList.add('hide')
        messageInput().focus()
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
},

logout = () => {
  const user = event.target.dataset.id
  sessionStorage.removeItem("user_session")
  checkSession()
}


/* Sockets (not doing anything)
-----------------------------------------------------------*/
// function openConnection() {
//   // return new WebSocket("ws://localhost:3000/cable")
//   return new WebSocket("wss://localhost:3000/cable")
// }

// const socket = new WebSocket('wss://localhost:8080');

// // Connection opened
// socket.addEventListener('open', function (event) {
//     socket.send('Hello Server!');
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });


/* Conversations
-----------------------------------------------------------*/
const fetchConversations = () => {
  return fetch(CONVO_API).then(r => r.json())
},

fetchConversation = (id) => {
  return fetch(`${CONVO_API}/${id}`).then(r => r.json())
  .then(convo => {
    if (CONVERSATION.id !== convo.id) {
      setConversation(convo, listen)
    } else {
      const messages = convo.messages.length
      console.log(messages)
    }
  })
},

fetchRandomConversation = () => {
  fetchConversations().then(convos => {
    setConversation(convos[randomize(convos)], listen)
  })
},

setConversation = (convo, callback) => {
  CONVERSATION = convo
  convoName().innerText = CONVERSATION.name
  convo.messages.forEach(message => {
    appendMessage(message)
  })
  callback(convo)
},

listen = (convo) => {
  const id = convo.id
  const name = convo.name
  let messages = convo.messages
  let count = messages.length
  console.log(`listening to ${convo}`)
  //setInterval(() => fetchConversation(id), 2000)
}

createConversation = () => {/* TODO */}

/* Messages
-----------------------------------------------------------*/
const appendMessage = (message) => {
  const {id, user_id, username, content, created_at:timestamp} = message
  const li = document.createElement('li')
  li.id = id
  li.innerHTML = `
  <p><strong>${username}</strong> <span class="timestamp">${moment(timestamp).calendar()}</span></p>
  <p>${content}</p>`
  if (user_id == sessionStorage["user_session"]) {
    li.insertAdjacentHTML('beforeend',`<button onclick="editMessage()">edit</button> <button onclick="deleteMessage()">delete</button>`)
  }
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

<<<<<<< HEAD

// editMessage = (message) => {/* TODO */},
// deleteMessage = (message) => {/* TODO */}
=======
editMessage = () => {
  const message = event.target.parentElement
  const messageId = message.id
  const messageContainer = message.querySelectorAll("p")[1]
  let content = messageContainer.innerText
  let editMessage = prompt("Edit Message", content)
  if (editMessage != null) {
    messageContainer.innerText = editMessage
  }
  // Now do post fetch with messageId

},
deleteMessage = () => {
  const message = event.target.parentElement
  const messageId = message.id
  message.remove()
  // Now do delete fetch with messageId

}
>>>>>>> master

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