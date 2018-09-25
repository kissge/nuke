import { Get, Post, Delete, Controller, Body, HttpException, Req, Param } from '@nestjs/common';
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
  async save(@Req() req, @Body() saveRecordsDto: SaveRecordDto[]) {
    try {
      const records = saveRecordsDto.map((r) => {
        const record = r as Record;
        record.user = req.user;
        return record;
      });

      return await this.recordService.save(records);
    } catch (error) {
      throw new HttpException(error.code, 400);
    }
  }

  @Delete('record/:id')
  async delete(@Req() req, @Param() id: number) {
    try {
      return await this.recordService.delete(id, req.user);
    } catch (error) {
      throw new HttpException(error.code, 400);
    }
  }
}
