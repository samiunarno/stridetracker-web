export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  subscription: 'free' | 'premium';
  avatarUrl?: string;
  createdAt: string;
}