export interface likeI {
  ArticleID: number;
  UserID: number;
}

export type likesI = Array<likeI>;

export interface commentI {
  UserID: number;
  ArticleID: number;
  Content: string;
}

export interface commentEditI extends commentI {
  ID: number;
}

export interface commentDeleteI {
  ID: number;
}

export interface collectI {
  UserID: number;
  ArticleID: number;
}
