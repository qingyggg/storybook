export interface commentItemI {
  UserName: string;
  ID: number;
  Content: string;
  UserID: number;
}

export type commentListT = Array<commentItemI>;

export type likesStatus = Array<boolean>;
