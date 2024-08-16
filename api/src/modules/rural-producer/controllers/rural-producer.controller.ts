import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  CreateRuralProducerService,
  GetDashboardIntelService,
} from '../use-cases';
import { ApiTags } from '@nestjs/swagger';
import { CreateRuralProducerDto } from '../dto';

@ApiTags('Rural Producer')
@Controller('rural-producer')
export class RuralProducerController {
  constructor(
    private readonly createRuralProducerUseCase: CreateRuralProducerService,
    private readonly getDashboardIntelService: GetDashboardIntelService,
  ) {}

  @Post('/')
  async createRuralProducer(@Body() body: CreateRuralProducerDto) {
    return await this.createRuralProducerUseCase.execute(body);
  }

  @Get('/dashboard')
  async getDashboard() {
    return await this.getDashboardIntelService.execute();
  }
}
