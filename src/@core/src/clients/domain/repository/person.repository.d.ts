import { SearchResult as DefaultResult } from '@seedwork/domain/repository/search-result';
import {
  ISearchableRepository,
  SearchParams as DefaultParams,
} from '../../../@seedwork/domain/repository';
import { Person } from '../entities';

declare namespace PersonRepository {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export type Filter = string;
  export class SearchParams extends DefaultParams<IPersonFilter> {}
  export class SearchResult extends DefaultResult<Person, IPersonFilter> {}
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export type Repository = ISearchableRepository<
    Person,
    IPersonFilter,
    SearchParams,
    PersonSearchResult
  >;
}
