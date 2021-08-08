import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Reg, RegRelations} from '../models';

export class RegRepository extends DefaultCrudRepository<
  Reg,
  typeof Reg.prototype.id,
  RegRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Reg, dataSource);
  }
}
