document.addEventListener('DOMContentLoaded', init)

const API = "http://localhost:3000/api/v1/",
  USERS_API = API + "users",
  CONVO_API = API + "conversations",
  MESSAGE_API = API + "messages"
  EDIT_MESSAGE_API = API + "messages" +"message.id"

let LOGGED_IN_USER
let CONVERSATION // set by: fetchRandomConversation() -> SetConversation(convo)

function init() {
  checkSession()
  listUsers()
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

listUsers = () => {
  fetchUsers().then(users => {
    users.forEach(user => {
      if (user.id != sessionStorage["user_session"]) {
        const li = document.createElement('li')
        const span = document.createElement('span')
        li.appendChild(span)
        span.innerText = user.username
        span.dataset.id = user.id
        span.addEventListener('click', createConversation)
        usersList().appendChild(li)
      }
    })
  })
}

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
    setConversation(convos[randomize(convos)])
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

createConversation = () => {
  const clickedId = event.target.dataset.id
  const clickedName = event.target.innerText
  const conversation = `${clickedName} & ${LOGGED_IN_USER.username}`
  alert(`Loading conversation between ${conversation}...`)
  alert(`Sorry, we ran out of time to program this.`)
}

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
  // Now do delete fetch with messageId

  fetch(MESSAGE_API+"/"+messageId, { method: "DELETE"})
  .then(r => r.json).then(message.remove())
   
}

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
const usersList = () => document.getElementById('users-list')