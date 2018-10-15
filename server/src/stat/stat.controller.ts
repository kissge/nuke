import { Get, Controller, Req } from '@nestjs/common';
import { RecordService } from '../record/record.service';

@Controller('api')
export class StatController {
  constructor(private readonly recordService: RecordService) {}

  @Get('stat/weekly')
  weekly(@Req() req) {
    return this.recordService.weekly(req.user);
  }
}
