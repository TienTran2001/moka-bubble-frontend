export interface IUser {
  _id: string;
  username: string;
  hashedPassword: string;
  displayName: string;
  email?: string;
  avatarUrl?: string;
  avatarId?: string;
  bio?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}
