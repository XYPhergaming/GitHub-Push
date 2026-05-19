import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Message } from '@/types';

const MESSAGES_COLLECTION = 'messages';

// Send a new message
export const sendMessage = async (text: string, userId: string, userEmail: string) => {
  await addDoc(collection(db, MESSAGES_COLLECTION), {
    text,
    userId,
    userEmail,
    createdAt: serverTimestamp(),
  });
};

// Real-time listener for messages
export const subscribeToMessages = (callback: (messages: Message[]) => void) => {
  const q = query(
    collection(db, MESSAGES_COLLECTION),
    orderBy('createdAt', 'asc'),
    limit(100)
  );
  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data.text,
        userId: data.userId,
        userEmail: data.userEmail,
        createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
      } as Message;
    });
    callback(msgs);
  });
};