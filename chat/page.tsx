'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { sendMessage, subscribeToMessages } from '@/lib/firestore';
import Message from '@/components/Message';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Message as MessageType } from '@/types';
import gsap from 'gsap'; // optional, if installed

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToMessages(setMessages);
    return unsubscribe;
  }, [user]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;

    try {
      await sendMessage(newMessage.trim(), user.uid, user.email!);
      setNewMessage('');

      // Optional GSAP animation on sent message (flash the input)
      if (messageListRef.current) {
        gsap.fromTo(
          messageListRef.current.lastElementChild,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }
    } catch (error) {
      console.error('Send failed', error);
    }
  };

  if (!user) return null; // Should be redirected by middleware

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg shadow overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messageListRef}>
        {messages.map((msg) => (
          <Message
            key={msg.id}
            message={msg}
            isOwnMessage={msg.userId === user.uid}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="border-t p-4 flex gap-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
          autoComplete="off"
        />
        <Button type="submit" disabled={!newMessage.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}