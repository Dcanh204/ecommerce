import React, { useState } from 'react';
import ChatButton from './ChatButton';
import ChatBox from './ChatBox';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={toggleChat} />
      <ChatBox isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Chatbot;