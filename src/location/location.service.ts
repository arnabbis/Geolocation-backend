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

@Injectable()
export class LocationService {

  constructor(@InjectRepository(Location) private readonly Location: Repository<Location>, @InjectRepository(Parcel) private readonly Parcel: Repository<Parcel>){}




  create(createLocationDto: location_location): Observable<location_location> {
    return from(this.Location.save(createLocationDto))
  }

  findAll(): Observable<location_location[]> {
    return from(this.Location.find());
  }

  async createParcelPoint(createParcelPointDto:Parcel): Promise<Parcel> {
    const { position } = createParcelPointDto

    const polygon: Polygon = {
        type: 'Polygon',
        coordinates: [position],
    }

    const parcel = this.Parcel.create({
        polygon,
    })

    await this.Parcel.save(parcel)
    return parcel
}
}
  
