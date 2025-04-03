import {Developer} from "./Developer";

export interface Game{
    id: number;
    name: string;
    genre: string | null;
    rating: number | null;
    description: string | null;
    developers: Developer[];
}