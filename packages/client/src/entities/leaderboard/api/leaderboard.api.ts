import { API_BASE_URL } from '@/config/api';
import axios, { AxiosError } from 'axios';
import {
  FetchLeaderboardAllParams,
  ILeaderBoardItem,
  ILeaderboardNewLeaderRequest,
} from '../types/leaderboard.type';
import { useState } from 'react';

export const LEADERBOARD_KEY = 'leaderboard';
export const LEADERBOARD_URL = `${API_BASE_URL}/leaderboard`;

export function useLeaderboardAll() {
  const [leaderboardData, setLeaderboardData] = useState<
    ILeaderBoardItem[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchLeaderboard = async (
    params: FetchLeaderboardAllParams,
    append = false,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ILeaderBoardItem[]>(
        `${LEADERBOARD_URL}/all`,
        params,
        {
          withCredentials: true,
        },
      );
      if (append && leaderboardData) {
        setLeaderboardData([...leaderboardData, ...response.data]);
      } else {
        setLeaderboardData(response.data);
      }
      setHasMore(response.data.length === params.limit);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError('Неизвестная ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  return { leaderboardData, loading, error, hasMore, fetchLeaderboard };
}

export function useAddNewLeaderboard() {
  const leaderboardNew = async (data: ILeaderboardNewLeaderRequest) => {
    try {
      await axios.post(`${LEADERBOARD_URL}`, data, {
        withCredentials: true,
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  };
  return { leaderboardNew };
}
