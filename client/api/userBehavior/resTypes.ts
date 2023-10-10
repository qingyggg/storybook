export interface followStatusI {
  isFollow: boolean;
}

export interface followItem {
  UserID: number;
  Name: string;
  Description: string;
}

export type followList = Array<followItem>;

export interface followAmountI {
  followingAmount: number;
  followedAmount: number;
}
