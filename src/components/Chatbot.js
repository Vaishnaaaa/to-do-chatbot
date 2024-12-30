import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const handleSendMessage = () => {
    if (userMessage) {
      setMessages([...messages, { sender: 'user', text: userMessage }]);
      setUserMessage('');
      setTimeout(() => {
        const botReply = 'I received your message!';
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botReply },
        ]);
      }, 1000);
    }
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}>
        {messages.length === 0 ? (
          <p>Start the conversation...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender === 'bot' ? 'left' : 'right' }}>
              <strong>{msg.sender === 'bot' ? 'Bot' : 'You'}: </strong>
              <span>{msg.text}</span>
            </div>
          ))
        )}
      </div>
      <div>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Say something..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
