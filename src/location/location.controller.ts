import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Observable } from 'rxjs';
import { location_location } from './location.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { readFileSync } from 'fs';
import { Parcel } from './entities/polygon.entity';
import { parse } from 'papaparse'
import { lineString } from './entities/line.entity';

@Controller('gisdata')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  message() {
    return 'hii arnab';
  }

  // @Post("/msg")
  // messagePost() {
  //   return "ndsfgsdfgbufdguf"
  // }

  @Post()
  create(
    @Body() createLocation: CreateLocationDto,
  ): Observable<location_location> {
    console.log(createLocation);
    return this.locationService.create(createLocation);
  }

  @Get('/allData')
  findAll() {
    return this.locationService.findAll();
  }

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file_asset', {
      storage: diskStorage({
        destination: './files',
      }),
    }),
  )
  async uploadFile() {
    const csvFile = readFileSync('files/1.csv');
    const csvData = csvFile.toString();
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });
    console.log(parsedCsv);

    for (let a of parsedCsv.data) {
      console.log(a);
      var point = { type: 'Point', coordinates: [a.lat,a.lon] };
      var newData = {
        lat: a.lat,
        lon: a.lon,
        City_Name: a.city_name,
        geom: point,
      };
      console.log(newData);
        console.log(this.locationService.create(newData))
      }
    }

    @Post('/create')
     async createParcelPoint(
         @Body()
         createParcelPointDto:Parcel
     ): Promise<Parcel> {
         return this.locationService.createParcelPoint(createParcelPointDto)
     }

     @Post('/createline')
     async createlinePoint(
         @Body()
         createlinePointDto:lineString
     ): Promise<lineString> {
         return this.locationService.createLinePoint(createlinePointDto)
     }
  }

