import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
 import {LineString} from "geojson";
 import { Position } from "geojson";
import { IsOptional } from "class-validator";

 @Entity({ name: 'lineString' })

 export class lineString {

     @PrimaryGeneratedColumn()
     id: number

     @Column({ nullable: true })
     City_Name: string;
     
     @Index({ spatial: true })
     @Column({
         type: 'geography',
         spatialFeatureType:'LineString',
         srid:4326,
         nullable: true
     })
     lineString:LineString

     @IsOptional()
     position?: number[][]

 }