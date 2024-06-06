export interface ProfileType {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: UserType;
}

export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: PostType[];
  profile: ProfileType;
}

export interface PostType {
  id: number;
  title: string;
  content: string;
  autherId: number;
  createdAt: Date;
  auther: UserType;
}
