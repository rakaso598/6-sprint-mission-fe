export interface User {
  id: number;
  email: string;
  nickname: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}
