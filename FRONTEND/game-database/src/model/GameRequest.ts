export interface GameRequest{
    id?: number;
    name: string;
    genre: string;
    rating: number;
    description: string;
    developerIds: number[];
}