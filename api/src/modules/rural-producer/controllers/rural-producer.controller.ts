import { Body, Controller, Post } from '@nestjs/common';
import { CreateRuralProducerService } from '../use-cases';
import { ApiTags } from '@nestjs/swagger';
import { CreateRuralProducerDto } from '../dto';

@ApiTags('Rural Producer')
@Controller('rural-producer')
export class RuralProducerController {
  constructor(
    private readonly createRuralProducerUseCase: CreateRuralProducerService,
  ) {}

  @Post('/')
  async createRuralProducer(@Body() body: CreateRuralProducerDto) {
    return await this.createRuralProducerUseCase.execute(body);
  }
}
