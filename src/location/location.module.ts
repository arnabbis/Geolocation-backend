import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Parcel } from './entities/polygon.entity';
import { lineString } from './entities/line.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location,Parcel,lineString])
  ],
  controllers: [LocationController],
  providers: [LocationService]
})
export class gismodule { }
