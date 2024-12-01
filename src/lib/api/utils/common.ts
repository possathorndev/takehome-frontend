export type ListResponseData<T> = { data: T[] };

export type FindResponse<T> = ListResponseData<T> & {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};