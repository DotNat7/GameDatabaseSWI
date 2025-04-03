package cz.osu.gamedatabase.service;

import cz.osu.gamedatabase.request.GameRequest;
import cz.osu.gamedatabase.model.Game;

import java.util.List;

public interface GameService {
    Game create(GameRequest request);
    Game read(Long id);
    Game update(GameRequest request);
    void delete(Long id);
    List<Game> list();
    List<Game> listByDeveloper(Long developerId);
}
