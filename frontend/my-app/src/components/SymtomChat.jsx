import React, { useState } from 'react';
import axios from 'axios';

export default function SymptomChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: input });
      const botReply = response.data.reply;
      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error("API Error:", error.message);
      setMessages([...newMessages, { sender: 'bot', text: "Sorry, I couldn’t process your request." }]);
    }
  };

  return (
    <div style={{ width: 400, margin: 'auto', fontFamily: 'Arial' }}>
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong style={{ color: msg.sender === 'user' ? 'blue' : 'black' }}>
              {msg.sender === 'user' ? 'You' : 'Bot'}:
            </strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your symptoms..."
          style={{ flex: 1, padding: 5 }}
        />
        <button onClick={sendMessage} style={{ padding: '5px 10px', background: 'green', color: 'white' }}>Send</button>
      </div>
    </div>
  );
}
