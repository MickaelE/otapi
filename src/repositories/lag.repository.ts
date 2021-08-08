import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Lag, LagRelations} from '../models';

export class LagRepository extends DefaultCrudRepository<
  Lag,
  typeof Lag.prototype.lag_id,
  LagRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Lag, dataSource);
  }
}
