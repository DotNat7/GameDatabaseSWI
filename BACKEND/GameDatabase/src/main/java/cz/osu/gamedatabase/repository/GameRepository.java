package cz.osu.gamedatabase.repository;

import cz.osu.gamedatabase.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findAllByDevelopersId(Long developerId);
}
