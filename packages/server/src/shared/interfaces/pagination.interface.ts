export interface IPaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
