package cz.osu.gamedatabase.controller;

import cz.osu.gamedatabase.model.Developer;
import cz.osu.gamedatabase.request.GameRequest;
import cz.osu.gamedatabase.model.Game;
import cz.osu.gamedatabase.service.GameService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class GameController {
    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping("/games")
    public Game postGame(@RequestBody @Valid GameRequest request) {
        return gameService.create(request);
    }

    @GetMapping("/games/{id}")
    public Game getGame(@PathVariable("id") Long id) {
        return gameService.read(id);
    }

    @PutMapping("/games")
    public Game putGame(@RequestBody @Valid GameRequest request) {
        return gameService.update(request);
    }

    @DeleteMapping("/games/{id}")
    public void deleteGame(@PathVariable("id") Long id) {
        gameService.delete(id);
    }

//    @GetMapping("/games")
//    public List<Game> getGames(@RequestParam(required = false, defaultValue = "ASC") String direction, @RequestParam(required = false, defaultValue = "date")String attribute) {
//        return gameService.list(direction, attribute);
//    }

    @GetMapping("/games")
    public List<Game> getGames() {
        return gameService.list();
    }


    @GetMapping("/games/forDevelopers")
    public List<Game> getGamesForDeveloper(@RequestParam Long developerId) {
        return gameService.listByDeveloper(developerId);
    }
}
