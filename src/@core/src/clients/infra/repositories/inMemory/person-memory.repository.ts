import { Person } from '../../../domain/entities';
import { InMemorySearchbleRepository } from '../../../../@seedwork/domain/repository/abstract-in-memory.repository';
import { PersonRepository } from 'clients/domain/repository';

export class PersonInMemoryRepository
  extends InMemorySearchbleRepository<Person>
  implements PersonRepository.Repository
{
  protected async applyFilter(
    items: Person[],
    filter: PersonRepository.Filter,
  ): Promise<Person[]> {
    if (!filter) return items;

    return items.filter(i =>
      i.props.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }
}
