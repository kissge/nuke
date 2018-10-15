import { Get, Post, Delete, Controller, Body, HttpException, Req, Param } from '@nestjs/common';
import { Record } from './record.entity';
import { RecordService } from './record.service';
import { SaveRecordDto } from './save-record.dto';

@Controller('api')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get('record/:yyyymm/:user?')
  findAll(@Req() req, @Param() params) {
    if (!params.yyyymm.match(/^\d{4}-(?:0\d|1[012])/)) {
      throw new HttpException('Invalid query', 400);
    }

    if (!req.user.isAdmin) {
      // silently ignore
      params.user = null;
    }

    return this.recordService.findWithinMonth(params.yyyymm, params.user || req.user.id);
  }

  @Post('record')
  async save(@Req() req, @Body() saveRecordsDto: SaveRecordDto[]) {
    // FIXME: user id should be checked on update
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
    // FIXME: user id should be checked
    try {
      return await this.recordService.delete(id, req.user);
    } catch (error) {
      throw new HttpException(error.code, 400);
    }
  }
}
