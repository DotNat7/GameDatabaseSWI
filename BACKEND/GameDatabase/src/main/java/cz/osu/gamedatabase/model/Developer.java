package cz.osu.gamedatabase.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cz.osu.gamedatabase.request.DeveloperRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "Developers")
public class Developer {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotNull
    private String name;

    private String country;

    @NotNull
    private LocalDateTime created;

    private LocalDateTime update;

    public Developer() {
    }

    public Developer(DeveloperRequest request) {
        name = request.getName();
        country = request.getCountry();
    }


    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "DevelopersInGames",
               joinColumns = @JoinColumn(name = "DeveloperId"),
               inverseJoinColumns = @JoinColumn(name = "GameId"))

    private Set<Game> games;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCountry() {
        return country;
    }

    public Set<Game> getGames() {
        return games;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public LocalDateTime getUpdate() {
        return update;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setGames(Set<Game> games) {
        this.games = games;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public void setUpdate(LocalDateTime update) {
        this.update = update;
    }
}
