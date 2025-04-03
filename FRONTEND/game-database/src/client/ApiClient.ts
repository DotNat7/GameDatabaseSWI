import {Game} from "../model/Game"
import {GameRequest} from "../model/GameRequest";
import {Developer} from "../model/Developer";
import {DeveloperRequest} from "../model/DeveloperRequest";
export default class ApiClient{

    public static async getAllDevelopers() : Promise<Developer[]> {
        const response = await fetch("http://localhost:8080/developers");
        return await response.json();
    }

    public static async deleteDeveloper(id: number): Promise<Response> {
        return await fetch("http://localhost:8080/developers/" + id, {
            method: "DELETE"
        });
    }

    public static async getDeveloper(id: number) : Promise<Developer> {
        const response = await fetch("http://localhost:8080/developers/" +id);
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }
    public static async getGamesForDeveloper(developerId: number): Promise<Game[]> {
        const response = await fetch("http://localhost:8080/games/forDeveloper?developerId=" + developerId);
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }

    public static async updateDeveloper(developer: Developer) : Promise<Developer> {
        const requestBody: DeveloperRequest = { id: developer.id, name: developer.name, country: developer.country};
        const response = await fetch("http://localhost:8080/developers", {
            method: "PUT",
            body: JSON.stringify(requestBody),
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        });
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }

    public static async createDeveloper(developer: DeveloperRequest): Promise<Developer> {
        const response = await fetch("http://localhost:8080/developers", {
            method : 'POST',
            body: JSON.stringify(developer),
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }

    public static async getAllGames() : Promise<Game[]> {
        const result = await fetch("http://localhost:8080/games");
        return await result.json();
    }

    public static async deleteGame(id: number): Promise<Response> {
        return await fetch("http://localhost:8080/games/" + id, {
            method: "DELETE"
        });
    }

    public static async updateGame(game: Game) : Promise<Game> {
        const requestBody: GameRequest = {
            id: game.id, name: game.name, genre: game.genre,
            rating: game.rating, description: game.description,
            developerIds: game.developers.map(d => d.id)
        };
        const response = await fetch("http://localhost:8080/games", {
            method: "PUT",
            body: JSON.stringify(requestBody),
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        });
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }

    public static async getGame(id: number) : Promise<Game> {
        const response = await fetch("http://localhost:8080/games/" +id);
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }

    public static async createGame(game: GameRequest): Promise<Game> {
        const response = await fetch("http://localhost:8080/games", {
            method : 'POST',
            body: JSON.stringify(game),
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }

    public static async searchDevelopers(searchQuery: string): Promise<Developer[]> {
        const response = await fetch("http://localhost:8080/developers/search", {
            method : 'POST',
            body: searchQuery,
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return await response.json();
        }
        throw Error(response.statusText);
    }
}
