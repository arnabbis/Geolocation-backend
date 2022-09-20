import { Column, Index, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';
import { Polygon } from 'geojson';

export class CreateLocationDto {
  @PrimaryGeneratedColumn('increment')
  pk_id: number;
  @Column()
  lat: number;
  @Column()
  lon: number;
  @Column()
  City_Name: string;
  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  geom: Point;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: true,
  })
  polygon: Polygon;
}
