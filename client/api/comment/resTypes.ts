export interface commentItemI {
  UserName: string;
  ID: number;
  Content: string;
  UserID: number;
  ArticleID: number;
}

export type commentListT = Array<commentItemI>;
export interface likeStatus {
  isLike: boolean;
}
export type likesStatus = Array<boolean>;

export interface collectStatus {
  isCollect: boolean;
}
