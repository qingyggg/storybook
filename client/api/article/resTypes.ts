export interface articleItemForListI {
  ID: number;
  Title: string;
  Description: string;
  LikeNumber: number;
  CommentNumber: number;
  CollectNumber: number;
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
  CollectNumber: number;
  CommentNumber: number;
  CreatedAt: string;
  UpdatedAt: string;
}
