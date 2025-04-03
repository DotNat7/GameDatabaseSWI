package cz.osu.gamedatabase.controller;

import cz.osu.gamedatabase.request.DeveloperRequest;
import cz.osu.gamedatabase.model.Developer;
import cz.osu.gamedatabase.service.DeveloperService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class DeveloperController {
    private final DeveloperService developerService;

    public DeveloperController(DeveloperService developerService) {
        this.developerService = developerService;
    }

    @PostMapping("/developers")
    public Developer postDeveloper(@RequestBody @Validated DeveloperRequest developer) {
        return developerService.create(developer);
    }

    @GetMapping("/developers")
    public List<Developer> getDevelopers() {
        return developerService.list();
    }

    @GetMapping("/developers/{id}")
    public Developer getDeveloper(@PathVariable("id") Long id) {
        return developerService.read(id);
    }

    @DeleteMapping("/developers/{id}")
    public void deleteDeveloper(@PathVariable("id") Long id) {
        developerService.delete(id);
    }

    @PutMapping("/developers")
    public Developer putDeveloper(@RequestBody @Validated DeveloperRequest developer) {
        return developerService.update(developer);
    }

    @PostMapping("/developers/search")
    public List<Developer> searchDevelopers(@RequestBody String query) {
        return developerService.search(query);
    }
}
