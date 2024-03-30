export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | null;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export  interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
}

export  interface Art {
  _id: string;
  user: User;
  name: string;
  photo: string;
}

export interface ArtMutation {
  name: string;
  photo: File | string | null;
}
