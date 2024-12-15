import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateRuralProducerService,
  DeleteRuralProducerService,
  GetDashboardIntelService,
  UpdateRuralProducerService,
} from '../use-cases';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateRuralProducerDto,
  GetDashboardIntelResponseDto,
  UpdateRuralProducerDto,
} from '../dto';

@ApiTags('Rural Producer')
@Controller('rural-producer')
export class RuralProducerController {
  constructor(
    private readonly createRuralProducerUseCase: CreateRuralProducerService,
    private readonly getDashboardIntelService: GetDashboardIntelService,
    private readonly deleteRuralProducerService: DeleteRuralProducerService,
    private readonly updateRuralProducerService: UpdateRuralProducerService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Will create the rural producer',
  })
  async createRuralProducer(@Body() body: CreateRuralProducerDto) {
    await this.createRuralProducerUseCase.execute(body);
  }

  @Get('/dashboard')
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetDashboardIntelResponseDto,
    description: 'Will get dashboard data',
  })
  async getDashboard(): Promise<GetDashboardIntelResponseDto> {
    return await this.getDashboardIntelService.execute();
  }

  @Delete('/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Will delete the rural producer by id',
  })
  async deleteRuralProducerById(@Param('id') id: number) {
    await this.deleteRuralProducerService.execute(id);
  }

  @Put('/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Will update the rural producer by id',
  })
  async updateRuralProducerById(
    @Param('id') id: number,
    @Body() body: UpdateRuralProducerDto,
  ) {
    await this.updateRuralProducerService.execute({
      ...body,
      id,
    });
  }
}
