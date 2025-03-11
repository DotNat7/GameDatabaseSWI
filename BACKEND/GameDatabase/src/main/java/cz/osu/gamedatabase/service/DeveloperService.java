package cz.osu.gamedatabase.service;

import cz.osu.gamedatabase.request.DeveloperRequest;
import cz.osu.gamedatabase.model.Developer;

import java.util.List;

public interface DeveloperService {
    Developer create(DeveloperRequest developer);
    Developer read(Long id);
    Developer update(DeveloperRequest developer);
    void delete(Long id);
    List<Developer> list();
    List<Developer> search(String query);
}
