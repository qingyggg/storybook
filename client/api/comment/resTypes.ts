export interface commentItemI {
  UserName: string;
  ID: number;
  Content: string;
  UserID: number;
  ArticleId: number;
}

export type commentListT = Array<commentItemI>;

//whether the user  like this article
export type likesStatus = Array<boolean>;
