import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Point } from 'geojson';
import {Polygon} from 'geojson'
import { type } from 'os';

@Entity('geo')
export class Location {
  @PrimaryGeneratedColumn()
  pk_id: number;
  @Column({ type: 'decimal', nullable: true })
  lat: number;
  @Column({ type: 'decimal', nullable: true })
  lon: number;
  @Column({ nullable: true })
  City_Name: string;
  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  geom: Point;


}
