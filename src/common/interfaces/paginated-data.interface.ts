export interface PaginatedData<T> {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
}