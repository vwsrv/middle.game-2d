export type SortType = 'count' | 'level';

export interface FetchLeaderboardAllParams {
  ratingFieldName: SortType;
  cursor?: number;
  limit?: number;
}

export interface FetchLeaderboardRequest {
  data: { lvl: number; scope: number };
  ratingFieldName: SortType;
}

export interface ILeaderBoardItem {
  name: string;
  count: number;
  level: number;
}
