import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordService } from './record.service';
import { Record } from './record.entity';
import { RecordController } from './record.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
