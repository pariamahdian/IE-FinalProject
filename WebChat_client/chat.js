const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7287/chathub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

    const start = async () => {
        try {
            await connection.start();
            console.log("Connected to signal r hub");
        } catch (error) {
            console.log(error);
        }
    }

const joinUser = async () => {
    const user = sessionStorage.getItem('user');
    if (user)
    { 
        
        await joinChat(user);  
    }
}

 const joinChat = async (user) => {
    if (!user)
       return;
    try {
        const message = `${user} is online`;
        await connection.invoke("JoinChat", user, message);
    } catch (error) {
        console.log(error);
    }
}

//fetching the user from sesstion storage
const getUser = () => sessionStorage.getItem('user')

//getting notified by server
const receiveMessage = async () => {
    const currentUser = getUser();
    if (!currentUser)
        return;
    try {
        await connection.on("ReceiveMessage", (user, message) => {
         const messageClass = currentUser === user ? "send" : "received";
            appendMessage(message, messageClass);
            const alertSound = new Audio('notif-alert.wav');
            alertSound.play();
       })
    } catch (error) {
        console.log(error);
    }
}

//update the chat item list
const updateChatItems = (users) => {
    const chatItemsEl = document.getElementById('chatItems');
    chatItemsEl.innerHTML = '';
  
    users.forEach(user => {
      //Exclude the current user from the chat item list
      if (user !== currentUser) {
        const chatItemEl = document.createElement('li');
        chatItemEl.innerText = user;
        chatItemsEl.appendChild(chatItemEl);
      }
    });
  };

//Fetch the list of connected users from the server and update the chat item list
const getConnectedUsers = async () => {
    try {
      const connectedUsers = await connection.invoke('GetConnectedUsers');
      updateChatItems(connectedUsers);
    } catch (error) {
      console.log(error);
    }
  }

const appendMessage = (message,messageClass) => {
    const messageSectionEl = document.getElementById('messageSection');
    const msgBoxEl = document.createElement("div");
    msgBoxEl.classList.add("msg-box");
    msgBoxEl.classList.add(messageClass);
    msgBoxEl.innerHTML = message;
    messageSectionEl.appendChild(msgBoxEl);
}

document.getElementById('btnSend').addEventListener('click', async (e) => {
    e.preventDefault();
    const user = getUser();
    if (!user)
        return;
    const txtMessageEl = document.getElementById('txtMessage');
    const msg = txtMessageEl.value;
    if (msg) {
        //call the sendmessage api
        await sendMessage(user,`${user}: ${msg}`); 
        txtMessageEl.value = "";
    }
})

const sendMessage = async (user,message) => {
    
    try {
        await connection.invoke('SendMessage', user, message);
    } catch (error) {
        console.log(error);
    }
}

const startApp = async () => {
    await start(); 
    await joinUser();
    await receiveMessage();
    await getConnectedUsers(); 
}
startApp();
getConnectedUsers();

// Update the chat item list
connection.on('ReceiveConnectedUsers', (users) => {
    updateChatItems(users);
  });

// Update the chat item list whenever a new user joins or leaves 
connection.on('UserConnected', (user) => {
  addUserToChatItems(user);
});

connection.on('UserDisconnected', () => {
  getConnectedUsers();
});

// Function to add a user to the chat item list
const addUserToChatItems = (user) => {
    const chatItemsEl = document.getElementById('chatItems');
    const chatItems = chatItemsEl.getElementsByTagName('li');
    let userExists = false;
  
    
for (let i = 0; i < chatItems.length; i++) {
    if (chatItems[i].innerText === user) {
        userExists = true;
        break;
    }
}

if (!userExists) {
    const chatItemEl = document.createElement('li');
    chatItemEl.innerText = user;
    chatItemsEl.appendChild(chatItemEl);
  }
};

const image = sessionStorage.getItem('image');
document.getElementById('image').src = image;

