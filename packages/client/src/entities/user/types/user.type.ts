export interface IUserRequest {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IAvatarRequest {
  avatar: File;
}
