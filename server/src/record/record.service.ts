import { HttpException, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { Record } from './record.entity';
import { User } from '../user/user.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  findWithinMonth(yyyymm: string, user: number) {
    const start = yyyymm + '-01';
    const end = moment(start).endOf('month').format('YYYY-MM-DD');

    return this.recordRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.project', 'p')
      .leftJoinAndSelect('r.category', 'c')
      .where('r.date BETWEEN :start AND :end', {start, end})
      .andWhere('r.user = :user', {user})
      .orderBy('r.date')
      .getMany();
  }

  async save(records: Record[]) {
    return await this.recordRepository.save(records);
  }

  delete(id: number, user: User) {
    // FIXME: user id validation
    return this.recordRepository.delete(id);
  }

  weekly(user: User) {
    return this.recordRepository
      .createQueryBuilder('r')
      .select('projectId')
      .addSelect('categoryId')
      .addSelect('YEARWEEK(date)', 'week')
      .addSelect('SUM(duration)', 'total')
      .where('r.user = :user', {user: user.id})
      .andWhere('date BETWEEN DATE_SUB(NOW(), INTERVAL 7 week) AND NOW()')
      .groupBy('projectId')
      .addGroupBy('categoryId')
      .addGroupBy('YEARWEEK(date)')
      .getRawMany();
  }
}
