import { ApiProperty } from '@nestjs/swagger';
import { ITotalUsedCropsAmount } from '../../planted-crops/interfaces';
import { ITotalFarmsByState, ITotalUsedFarmArea } from '../interfaces';
import { TotalFarmsByStates } from './total-farms-by-states.dto';
import { TotalUsedCropsAmount } from './total-used-crops-amount.dto';

export class GetDashboardIntelResponseDto {
  @ApiProperty()
  totalFarmArea: number;

  @ApiProperty()
  totalUsedFarmArea: ITotalUsedFarmArea;

  @ApiProperty()
  totalFarms: number;

  @ApiProperty({
    isArray: true,
    type: TotalFarmsByStates,
  })
  totalFarmsByStates: ITotalFarmsByState[];

  @ApiProperty({
    isArray: true,
    type: TotalUsedCropsAmount,
  })
  totalUsedCropsAmount: ITotalUsedCropsAmount[];
}
