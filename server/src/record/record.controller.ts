import { Get, Post, Controller, Body, HttpException, Req, Param } from '@nestjs/common';
import { Record } from './record.entity';
import { RecordService } from './record.service';
import { SaveRecordDto } from './save-record.dto';

@Controller('api')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get('record/:yyyymm')
  findAll(@Req() req, @Param() params) {
    if (!params.yyyymm.match(/^\d{4}-(?:0\d|1[012])/)) {
      throw new HttpException('Invalid query', 400);
    }

    return this.recordService.findWithinMonth(params.yyyymm, req.user);
  }

  @Post('record')
  async save(@Req() req, @Body() saveRecordDto: SaveRecordDto) {
    try {
      const record = saveRecordDto as Record;
      record.user = req.user;

      return await this.recordService.save(record);
    } catch (error) {
      throw new HttpException(error.code, 400);
    }
  }
}
