// src/common/dto/query.dto.ts
import { PaginationDto } from './pagination.dto';
import { SortDto } from './sort.dto';

export class QueryDto<T extends { getWhere: () => any }> {
  pagination: PaginationDto;
  sort: SortDto;
  filter: T;

  constructor(pagination: PaginationDto, sort: SortDto, filter: T) {
    this.pagination = pagination;
    this.sort = sort;
    this.filter = filter;
  }

  // Helper to get Prisma findMany arguments
  getFindManyArgs() {
    return {
      where: this.filter.getWhere(),
      orderBy: this.sort.getOrderBy(),
      skip: this.pagination.getSkip(),
      take: this.pagination.getTake(),
    };
  }
}
