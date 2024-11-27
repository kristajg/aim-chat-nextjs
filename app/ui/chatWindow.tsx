'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
// @ts-ignore
import useSound from 'use-sound';

import { randomizedMessageBack, randomizeSleepTime } from '../lib/utils';
import styles from './chatWindowStyles.module.scss';

export default function ChatWindow({
  currentUser,
  currentBuddy,
  chats,
}: {
  currentUser: string,
  currentBuddy: string,
  chats: Array<string>,
}) {
  const messagesEndRef = useRef(null);

  const [playMsgIn] = useSound('/msg_in.mp3');
  const [playMsgOut] = useSound('/msg_out.mp3');
  
  const [messages, setMessages] = useState([]); // array of obj
  const [newMessage, setNewMessage] = useState('');

  const playSound = (user: string) => {
    if (user === currentUser) {
      playMsgOut();
    } else {
      playMsgIn();
    }
  }

  const scrollChatToBottom = () => {
    window.requestAnimationFrame(() => {
      // @ts-ignore
      messagesEndRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
    })
  }

  const sendMessage = (e: Event|MouseEvent) => {
    e.preventDefault();
    if (newMessage) {
      // 1st add the current user's message to the prevmessages & scroll to bottom
      // @ts-ignore
      setMessages((prevMessages) => [...prevMessages, { user: currentUser, message: newMessage }]);
      playSound(currentUser);
      scrollChatToBottom();

      // 2nd randomize & then add the fake buddy's message to the prevmessages & scroll to bottom
      const buddyMessage = randomizedMessageBack(chats);
      const sleepTime = randomizeSleepTime();
      setTimeout(() => {
        // @ts-ignore
        setMessages((prevMessages) => [...prevMessages, { user: currentBuddy, message: buddyMessage }]);
        playSound(currentBuddy);
        scrollChatToBottom();
      }, sleepTime);

      
      setNewMessage('');
    }
  };

  return (
    <div className={`window ${styles.chatwindow}`}>
      <div className="title-bar">
        <div className="title-bar-text">Chat with {currentBuddy} - Instant Message</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <div className={styles.chathistory}>
          {messages.map((data: { user: string, message: string }, index) => (
            <div key={index}>
              <span className={data.user === currentUser ? styles.yourusername : styles.buddyusername}>{data.user}:</span> {data.message}
            </div>
          ))}            
          <div className='anchor' ref={messagesEndRef} />
        </div>
        <div className='chat-controls'>
          <textarea
            className={styles.chatinput}
            id='chat-input'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              // @ts-ignore
              if (e.key === "Enter") sendMessage(e)
            }}
          />
          <div className={styles.chatcontrols}>
            <button onClick={playMsgOut}>
              Sound Test
            </button>
            <button onClick={scrollChatToBottom}>
              Scroll Test
            </button>
            {/* @ts-ignore */}
            <button onClick={e => sendMessage(e)} className={styles.sendbutton}>
              <Image
                src={newMessage ? '/aim_icon_enabled.png' : '/aim_icon_disabled.png'}
                alt='Send button'
                width={0}
                height={0}
                sizes="100vw"
                className={styles.buttonicon}
              />
              <u>S</u>end
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}