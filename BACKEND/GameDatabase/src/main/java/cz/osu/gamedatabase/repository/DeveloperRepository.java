package cz.osu.gamedatabase.repository;

import cz.osu.gamedatabase.model.Developer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeveloperRepository extends JpaRepository<Developer, Long> {
    List<Developer> findAllByNameContainsIgnoreCase(String name);
    List<Developer> findAllByOrderByCreatedAsc();
}
