import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'path';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { Parcel } from './entities/polygon.entity';
import { location_location } from './location.interface';
import { Polygon } from 'geojson';
import { lineString } from './entities/line.entity';
import {LineString} from 'geojson';

@Injectable()
export class LocationService {

  constructor(@InjectRepository(Location) private readonly Location: Repository<Location>, @InjectRepository(Parcel) private readonly Parcel: Repository<Parcel>,@InjectRepository(lineString) private readonly lineString: Repository<lineString>){}




  create(createLocationDto: location_location): Observable<location_location> {
    return from(this.Location.save(createLocationDto))
  }

  findAll(): Observable<location_location[]> {
    return from(this.Location.find());
  }

  async createParcelPoint(createParcelPointDto:Parcel): Promise<Parcel> {
    const { position} = createParcelPointDto

    // const data = {
    //   City_Name:createParcelPointDto.City_Name,
    // }
    //console.log(data)
    const polygon: Polygon = {
        type: 'Polygon',
        coordinates: [position],
    }

     const Data = {
      Polygon:polygon,
      City_Name:createParcelPointDto.City_Name
     }
     console.log(Data)
    const parcel = this.Parcel.create({
        polygon,
        City_Name:createParcelPointDto.City_Name
    })

    await this.Parcel.save(parcel)
    return parcel
}

async createLinePoint(createLinePointDto:lineString): Promise<lineString> {
  const { position} = createLinePointDto

  // const data = {
  //   City_Name:createParcelPointDto.City_Name,
  // }
  //console.log(data)
  const lineString: LineString = {
      type: 'LineString',
      coordinates: [position],
  }

  //  const Data = {
    
  //   City_Name:createLinePointDto.City_Name
  //  }
  //  console.log(Data)

  const line = this.lineString.create({
      lineString,
      City_Name:createLinePointDto.City_Name
  })

  await this.lineString.save(line)
  return line
}

}
  
