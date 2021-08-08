import {Entity, model, property} from '@loopback/repository';

@model()
export class Reg extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  lag: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  sizes?: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  relatives: string[];


  constructor(data?: Partial<Reg>) {
    super(data);
  }
}

export interface RegRelations {
  // describe navigational properties here
}

export type RegWithRelations = Reg & RegRelations;
