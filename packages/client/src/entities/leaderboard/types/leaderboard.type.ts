export type SortType = 'count' | 'firstGuessWins';

export interface FetchLeaderboardAllParams {
  ratingFieldName: SortType;
  cursor?: number;
  limit?: number;
}

export interface ILeaderBoardItem {
  data: {
    name: string;
    count: number;
    level: number;
  };
}

export interface ILeaderboardNewLeaderRequest {
  data: { lvl: number; scope: number };
  ratingFieldName: SortType;
  teamName: string;
}
