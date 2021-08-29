import {Entity, model, property} from '@loopback/repository';

@model()
export class Lag extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  lagId?: number;

  @property({
    type: 'string',
    required: true,
  })
  LagNanm: string;

  @property({
    type: 'string',
  })
  LagYearGroup?: string;


  constructor(data?: Partial<Lag>) {
    super(data);
  }
}

export interface LagRelations {
  // describe navigational properties here
}

export type LagWithRelations = Lag & LagRelations;
