export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData extends LoginFormData {
  name: string;
}

export interface verifyFormData {
  email: string;
  code: string;
}
