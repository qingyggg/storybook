export interface loginI {
  Email: string;
  Password: string;
}

export interface registerI extends loginI {}

export type modifyT = {
  ID: number;
  OldPassword: string;
  Password: string;
};
//for showProfile() api
export type userIdT = number;

export interface profileI {
  Name?: string;
  Age?: number;
  Avatar?: any[];
  Description?: string;
  Github?: string;
  WeChat?: string;
  Twitter?: string;
}

export interface editProfileI extends profileI {
  UserId?: number;
}
