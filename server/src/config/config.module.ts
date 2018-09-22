import * as fs from 'fs';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: JSON.parse(
        fs.readFileSync('config.json', { encoding: 'utf-8' }),
      ) as ConfigService,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
