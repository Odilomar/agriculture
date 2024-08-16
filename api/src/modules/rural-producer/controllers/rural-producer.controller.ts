import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  CreateRuralProducerService,
  GetDashboardIntelService,
} from '../use-cases';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRuralProducerDto, GetDashboardIntelResponseDto } from '../dto';

@ApiTags('Rural Producer')
@Controller('rural-producer')
export class RuralProducerController {
  constructor(
    private readonly createRuralProducerUseCase: CreateRuralProducerService,
    private readonly getDashboardIntelService: GetDashboardIntelService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  async createRuralProducer(@Body() body: CreateRuralProducerDto) {
    return await this.createRuralProducerUseCase.execute(body);
  }

  @Get('/dashboard')
  @ApiResponse({ status: HttpStatus.OK, type: GetDashboardIntelResponseDto })
  async getDashboard(): Promise<GetDashboardIntelResponseDto> {
    return await this.getDashboardIntelService.execute();
  }
}
