interface articleItemForListI {
  ID: string;
  Title: string;
  Description: string;
  LikeNumber: number;
  CommentNumber: number;
}

export type articleListType = articleItemForListI[];

export interface articleDetailI {
  ID: number;
  Title: string;
  Description: string;
  Content: string;
  UserID: number;
  Comments: any[];
  LikeNumber: number;
  CommentNumber: number;
}
