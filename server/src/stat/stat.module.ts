import { Module } from '@nestjs/common';
import { RecordModule } from '../record/record.module';
import { RecordService } from '../record/record.service';
import { StatController } from './stat.controller';

@Module({
  imports: [RecordModule],
  providers: [RecordService],
  controllers: [StatController],
})
export class StatModule {}
