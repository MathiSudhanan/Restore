export interface MetaData {
  currentPage: number;
  totalPage: number;
  pageSize: number;
  totalCount: number;
}

export class PaginatedResponse<T> {
  /**
   *
   */
  constructor(items: T, metaData: MetaData) {
    this.items = items;
    this.metaData = metaData;
  }
  items: T;
  metaData: MetaData;
}
