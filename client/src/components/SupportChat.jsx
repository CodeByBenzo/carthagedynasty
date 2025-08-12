

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import './SupportChat.css';

const socket = io('http://localhost:5000', { path: '/socket.io' });


const SupportChat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const isRegistered = !!user?.username && user?.username !== 'Guest';

  useEffect(() => {
    socket.on('chat history', (msgs) => setMessages(msgs));
    socket.on('chat message', (msg) => setMessages((prev) => [...prev, msg]));
    return () => {
      socket.off('chat history');
      socket.off('chat message');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !isRegistered) return;
    socket.emit('chat message', {
      user: user?.username,
      text: input.trim(),
    });
    setInput('');
  };

  return (
    <div className="support-chat torn-paper">
      <div className="chat-header">Support Chat</div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message${msg.user === user?.username ? ' own' : ''}`}>
            <span className="chat-user">{msg.user}:</span> <span className="chat-text">{msg.text}</span>
            <span className="chat-time">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-row" onSubmit={sendMessage}>
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isRegistered ? "Type your message..." : "Login to chat"}
          disabled={!isRegistered}
        />
        <button className="chat-send-btn" type="submit" disabled={!isRegistered}>Send</button>
      </form>
      {!isRegistered && (
        <div className="chat-login-warning">You must be registered and logged in to chat.</div>
      )}
    </div>
  );
};

export default SupportChat;
