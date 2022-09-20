import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
 import { Polygon } from "geojson";
 import { Position } from "geojson";
import { IsOptional } from "class-validator";

 @Entity({ name: 'parcels' })

 export class Parcel {

     @PrimaryGeneratedColumn()
     id: number

     @Column({ nullable: true })
     City_Name: string;
     
     @Index({ spatial: true })
     @Column({
         type: 'geography',
         spatialFeatureType: 'Polygon',
         srid:4326,
         nullable: true
     })
     polygon: Polygon

     @IsOptional()
     position?: number[][]

 }