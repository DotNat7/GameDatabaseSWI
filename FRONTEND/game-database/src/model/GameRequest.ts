export interface GameRequest{
    id?: number;
    name: string;
    genre: string | null;
    rating: number | null;
    description: string | null;
    developerIds: number[];
}