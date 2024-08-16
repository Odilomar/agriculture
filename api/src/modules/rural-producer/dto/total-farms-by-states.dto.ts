import { ApiProperty } from '@nestjs/swagger';

export class TotalFarmsByStates {
  @ApiProperty()
  state: string;

  @ApiProperty()
  total: number;
}
