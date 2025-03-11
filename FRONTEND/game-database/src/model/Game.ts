import {Developer} from "./Developer";

export interface Game{
    id: number;
    name: string;
    genre: string;
    rating: number;
    description: string;
    developers: Developer[];
}