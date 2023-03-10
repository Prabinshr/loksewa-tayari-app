export interface Pagination {
  next?: {
    page?: number;
    limit?: number;
  };
  previous?: {
    page?: number;
    limit?: number;
  };
}
