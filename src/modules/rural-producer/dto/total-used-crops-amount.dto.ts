import { ApiProperty } from '@nestjs/swagger';

export class TotalUsedCropsAmount {
  @ApiProperty()
  name: string;

  @ApiProperty()
  total: number;
}
