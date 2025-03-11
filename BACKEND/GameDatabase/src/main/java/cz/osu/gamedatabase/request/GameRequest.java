package cz.osu.gamedatabase.request;

import jakarta.validation.constraints.NotNull;

import java.util.Set;

public class GameRequest {
    private Long id;
    @NotNull
    private String name;
    private String genre;
    private double rating;
    private String description;
    private boolean isInEarlyAccess;
    private Set<Long> DeveloperIds;

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

    public boolean getIsInEarlyAccess() {
        return isInEarlyAccess;
    }

    public Set<Long> getDeveloperIds() {
        return DeveloperIds;
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

    public void setIsInEarlyAccess(boolean inEarlyAccess) {
        isInEarlyAccess = inEarlyAccess;
    }

    public void setDeveloperIds(Set<Long> developerIds) {
        DeveloperIds = developerIds;
    }
}
