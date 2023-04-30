export interface likeI {
  ArticleID: number;
  UserID: number;
}

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
