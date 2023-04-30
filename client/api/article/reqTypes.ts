export interface articleI {
  UserID: number;
  Title: string;
  Description: string;
  Content: string;
}

export interface articleEditI extends articleI {
  ArticleID: number;
}

export interface articleDeleteI {
  ArticleID: number;
}
