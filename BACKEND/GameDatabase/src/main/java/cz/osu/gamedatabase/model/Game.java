package cz.osu.gamedatabase.model;

import cz.osu.gamedatabase.request.GameRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Set;

@Entity
@Table(name = "Games")
public class Game {

    public Game() {
    }

    public Game(GameRequest request) {
        id = request.getId();
        name = request.getName();
        genre = request.getGenre();
        rating = request.getRating();
        description = request.getDescription();
    }

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    private String genre;

    private double rating;

    private String description;

    @ManyToMany
    @JoinTable(name = "DevelopersInGames",
            inverseJoinColumns = @JoinColumn(name = "DeveloperId"),
            joinColumns = @JoinColumn(name = "GameId")
    )

    private Set<Developer> developers;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getGenre() {
        return genre;
    }

    public double getRating() {
        return rating;
    }

    public String getDescription() {
        return description;
    }

    public Set<Developer> getDevelopers() {
        return developers;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDevelopers(Set<Developer> developers) {
        this.developers = developers;
    }
}
