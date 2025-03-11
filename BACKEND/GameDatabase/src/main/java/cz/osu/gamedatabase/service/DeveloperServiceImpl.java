package cz.osu.gamedatabase.service;

import cz.osu.gamedatabase.request.DeveloperRequest;
import cz.osu.gamedatabase.exception.RecordNotFoundException;
import cz.osu.gamedatabase.model.Developer;
import cz.osu.gamedatabase.repository.DeveloperRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DeveloperServiceImpl implements DeveloperService {
    private final DeveloperRepository developerRepository;

    public DeveloperServiceImpl(DeveloperRepository developerRepository) {
        this.developerRepository = developerRepository;
    }

    @Override
    public Developer create(DeveloperRequest developer) {
        var toDb = new Developer(developer);
        toDb.setCreated(LocalDateTime.now());
        var ret = developerRepository.save(toDb);
        return ret;
    }

    @Override
    public Developer read(Long id) {
        return developerRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id, "Developer"));
    }

    @Override
    public Developer update(DeveloperRequest developer) {
        if (developer.getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        var fromDb = read(developer.getId());

        fromDb.setName(developer.getName());
        fromDb.setUpdate(LocalDateTime.now());
        var ret = developerRepository.save(fromDb);

        return ret;
    }

    @Override
    public void delete(Long id) {
        var fromDb = read(id);
        if (fromDb == null) {
            throw new RecordNotFoundException(id, "Developer");
        }
        developerRepository.deleteById(fromDb.getId());
    }

    @Override
    public List<Developer> list() {
        return developerRepository.findAll();
    }

    @Override
    public List<Developer> search(String query) {
        return developerRepository.findAllByNameContainsIgnoreCase(query);
    }
}
