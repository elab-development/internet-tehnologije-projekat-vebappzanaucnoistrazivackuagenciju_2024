import { City } from "./city.domain";

export type Researcher ={
    id:number;
    firstname:string;
    lastname:string;
    birthday:Date;
    city:City;
}