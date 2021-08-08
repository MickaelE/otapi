import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Lag} from '../models';
import {LagRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
@authenticate('jwt')

export class LagControllerController {
  constructor(
    @repository(LagRepository)
    public lagRepository : LagRepository,
  ) {}

  @post('/lags')
  @response(200, {
    description: 'Lag model instance',
    content: {'application/json': {schema: getModelSchemaRef(Lag)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lag, {
            title: 'NewLag',
            exclude: ['lag_id'],
          }),
        },
      },
    })
    lag: Omit<Lag, 'id'>,
  ): Promise<Lag> {
    return this.lagRepository.create(lag);
  }

  @get('/lags/count')
  @response(200, {
    description: 'Lag model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Lag) where?: Where<Lag>,
  ): Promise<Count> {
    return this.lagRepository.count(where);
  }

  @get('/lags')
  @response(200, {
    description: 'Array of Lag model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Lag, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Lag) filter?: Filter<Lag>,
  ): Promise<Lag[]> {
    return this.lagRepository.find(filter);
  }

  @patch('/lags')
  @response(200, {
    description: 'Lag PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lag, {partial: true}),
        },
      },
    })
    lag: Lag,
    @param.where(Lag) where?: Where<Lag>,
  ): Promise<Count> {
    return this.lagRepository.updateAll(lag, where);
  }

  @get('/lags/{lag_id}')
  @response(200, {
    description: 'Lag model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Lag, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Lag, {exclude: 'where'}) filter?: FilterExcludingWhere<Lag>
  ): Promise<Lag> {
    return this.lagRepository.findById(id, filter);
  }

  @patch('/lags/{id}')
  @response(204, {
    description: 'Lag PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lag, {partial: true}),
        },
      },
    })
    lag: Lag,
  ): Promise<void> {
    await this.lagRepository.updateById(id, lag);
  }

  @put('/lags/{id}')
  @response(204, {
    description: 'Lag PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lag: Lag,
  ): Promise<void> {
    await this.lagRepository.replaceById(id, lag);
  }

  @del('/lags/{id}')
  @response(204, {
    description: 'Lag DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lagRepository.deleteById(id);
  }
}
