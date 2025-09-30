import { API_BASE_URL } from '@/config/api';
import axios from 'axios';
import {
  FetchLeaderboardAllParams,
  FetchLeaderboardRequest,
  ILeaderBoardItem,
} from '../types/leaderboard';
import { useQuery } from '@tanstack/react-query';
import { LEADERBOARD_KEY } from './keys';

export function useLeaderboardAll({
  ratingFieldName,
  cursor = 0,
  limit = 10,
}: FetchLeaderboardAllParams) {
  return useQuery<ILeaderBoardItem[], Error>({
    queryKey: [`${LEADERBOARD_KEY}-all`, ratingFieldName, cursor, limit],
    queryFn: async () => {
      const response = await axios.post<ILeaderBoardItem[]>(
        `${API_BASE_URL}/${LEADERBOARD_KEY}/all`,
        {
          ratingFieldName,
          cursor,
          limit,
        },
      );
      return response.data;
    },
  });
}

export function useAddNewLeaderboard({
  data,
  ratingFieldName,
}: FetchLeaderboardRequest) {
  return useQuery<ILeaderBoardItem, Error>({
    queryKey: [LEADERBOARD_KEY, ratingFieldName],
    queryFn: async () => {
      const response = await axios.post<ILeaderBoardItem>(
        `${API_BASE_URL}/${LEADERBOARD_KEY}`,
        {
          data,
          ratingFieldName,
        },
      );
      return response.data;
    },
  });
}
