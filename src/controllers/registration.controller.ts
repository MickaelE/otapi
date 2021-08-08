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
import {Reg} from '../models';
import {RegRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
// ------------------------------------
@authenticate('jwt')
export class RegistrationController {
  constructor(
    @repository(RegRepository)
    public regRepository : RegRepository,
  ) {}

  @post('/regs')
  @response(200, {
    description: 'Reg model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reg)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reg, {
            title: 'NewReg',
            exclude: ['id'],
          }),
        },
      },
    })
    reg: Omit<Reg, 'id'>,
  ): Promise<Reg> {
    return this.regRepository.create(reg);
  }

  @get('/regs/count')
  @response(200, {
    description: 'Reg model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Reg) where?: Where<Reg>,
  ): Promise<Count> {
    return this.regRepository.count(where);
  }

  @get('/regs')
  @response(200, {
    description: 'Array of Reg model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reg, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reg) filter?: Filter<Reg>,
  ): Promise<Reg[]> {
    return this.regRepository.find(filter);
  }

  @patch('/regs')
  @response(200, {
    description: 'Reg PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reg, {partial: true}),
        },
      },
    })
    reg: Reg,
    @param.where(Reg) where?: Where<Reg>,
  ): Promise<Count> {
    return this.regRepository.updateAll(reg, where);
  }

  @get('/regs/{id}')
  @response(200, {
    description: 'Reg model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reg, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Reg, {exclude: 'where'}) filter?: FilterExcludingWhere<Reg>
  ): Promise<Reg> {
    return this.regRepository.findById(id, filter);
  }

  @patch('/regs/{id}')
  @response(204, {
    description: 'Reg PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reg, {partial: true}),
        },
      },
    })
    reg: Reg,
  ): Promise<void> {
    await this.regRepository.updateById(id, reg);
  }

  @put('/regs/{id}')
  @response(204, {
    description: 'Reg PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() reg: Reg,
  ): Promise<void> {
    await this.regRepository.replaceById(id, reg);
  }

  @del('/regs/{id}')
  @response(204, {
    description: 'Reg DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.regRepository.deleteById(id);
  }
}
