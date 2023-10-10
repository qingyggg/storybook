import { get2, post } from '../../util/request';
import { followI } from '@/api/userBehavior/reqTypes';
import {
  followAmountI,
  followList,
  followStatusI,
} from '@/api/userBehavior/resTypes';

export const followApi = (follow: followI) => {
  return () => post<followStatusI>('/behavior/follow', follow);
};
export const getFollowStatusApi = (follow: followI) => {
  return () => post<followStatusI>('/behavior/followStatus', follow);
};
export const getFollowingListApi = (uid: number) => {
  return () => get2<followList>('/behavior/followingList', { uid });
};
export const getFollowedListApi = (uid: number) => {
  return () => get2<followList>('/behavior/followedList', { uid });
};
export const getFollowAmountApi = (uid: number) => {
  return () => get2<followAmountI>('/behavior/followAmount', { uid });
};
