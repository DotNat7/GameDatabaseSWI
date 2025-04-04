package cz.osu.gamedatabase.request;

import jakarta.validation.constraints.NotNull;

public class DeveloperRequest {
    private Long id;
    @NotNull
    private String name;

    private String country;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCountry() {
        return country;
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
}
