export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  userEmail: string;
  createdAt: Date;
  // Optional: imageUrl if storage used
}