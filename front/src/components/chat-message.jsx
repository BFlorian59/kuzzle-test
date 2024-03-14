import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { lastJsonMessage, sendJsonMessage } = useWebSocket('ws://localhost:7512'); // Remplacez l'URL par celle de votre backend Kuzzle

  const sendMessage = () => {
    if (newMessage.length > 0 && newMessage.length <= 255) {
      sendJsonMessage({ author: 'Auteur', content: newMessage });
      setNewMessage('');
    } else {
      alert('Le message doit contenir entre 1 et 255 caractères.');
    }
  };
console.log(messages)
  useEffect(() => {
    if (lastJsonMessage) {
      setMessages(prevMessages => [...prevMessages, lastJsonMessage]);
    }
  }, [lastJsonMessage]);

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.author}: </strong>
            {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        placeholder="Saisissez votre message (max. 255 caractères)"
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
};

export default ChatComponent;