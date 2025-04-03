package cz.osu.gamedatabase.service;

import cz.osu.gamedatabase.request.GameRequest;
import cz.osu.gamedatabase.exception.RecordNotFoundException;
import cz.osu.gamedatabase.model.Game;
import cz.osu.gamedatabase.repository.DeveloperRepository;
import cz.osu.gamedatabase.repository.GameRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;

@Service
public class GameServiceImpl implements GameService {
    private final GameRepository gameRepository;
    private final DeveloperRepository developerRepository;

    public GameServiceImpl(GameRepository gameRepository, DeveloperRepository developerRepository) {
        this.gameRepository = gameRepository;
        this.developerRepository = developerRepository;
    }

    @Override
    public Game create(GameRequest request) {
        var game = new Game(request);

        manageDevelopers(game, request);

        return gameRepository.save(game);
    }

    @Override
    public Game read(Long id) {
        return gameRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id, "Game"));
    }

    @Override
    public Game update(GameRequest request) {
        var game = read(request.getId());

        game.setName(request.getName());
        game.setGenre(request.getGenre());
        game.setRating(request.getRating());
        game.setDescription(request.getDescription());

        manageDevelopers(game, request);

        return gameRepository.save(game);
    }

    @Override
    public void delete(Long id) {
        var game = read(id);
        gameRepository.delete(game);
    }

    @Override
    public List<Game> list() {
        return gameRepository.findAll();
    }

    @Override
    public List<Game> listByDeveloper(Long developerId) {
        return gameRepository.findAllByDevelopersId(developerId);
    }

    private void manageDevelopers(Game game, GameRequest request) {
        if (request.getDeveloperIds() != null && request.getDeveloperIds().size() > 0) {
            var developers = developerRepository.findAllById(request.getDeveloperIds());
            game.setDevelopers(new HashSet<>(developers));
        } else {
            game.setDevelopers(new HashSet<>());
        }
    }
}
