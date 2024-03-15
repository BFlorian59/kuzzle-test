import useWebSocket from 'react-use-websocket';
import React, { useState, useEffect } from 'react';


const Chat = () => {

const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState('');
const [Author, setAuthor] = useState('');
const { lastJsonMessage, sendJsonMessage } = useWebSocket('ws://localhost:7512');

const sendMessage = () => {
  if (newMessage.length > 0 && newMessage.length <= 255) {
    sendJsonMessage({
    controller: 'document', 
    action: 'create', 
    index: 'nyc-open-data', 
    collection: 'chat-message', 
    body: {
      author: Author,
      content: newMessage 
    }
  });
    setNewMessage('');
  } else {
    alert('Le message doit contenir entre 1 et 255 caractères.');
  }
};

useEffect(() => {
  if (lastJsonMessage) {
    setMessages(newMessage => [...newMessage, lastJsonMessage]);
  }
}, [lastJsonMessage]);
console.log(lastJsonMessage)


return(
  <div>
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <strong>Message de {message.result._source.author}: </strong>
          <br/>
          Contenu : {message.result._source.content}
        </div>
      ))}
    </div>
    <input
      type="text"
      value={newMessage}
      onChange={e => setNewMessage(e.target.value)}
      placeholder="Saisissez votre message (max. 255 caractères)"
    />
    <input
      type="text"
      value={Author}
      onChange={e => setAuthor(e.target.value)}
      placeholder="Saisissez votre Nom"
    />
    <button onClick={sendMessage}>Envoyer</button>
  </div>
)
};

export default Chat;