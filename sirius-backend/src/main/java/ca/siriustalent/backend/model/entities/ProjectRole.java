package ca.siriustalent.backend.model.entities;

import java.util.List;

public class ProjectRole {

    private String name;

    private int quota;

    private RoleFilters filters;

    private List<String> availablePerformers;

    private List<String> confirmedPerformers;

    // --- Getters and Setters ---

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuota() {
        return quota;
    }

    public void setQuota(int quota) {
        this.quota = quota;
    }

    public RoleFilters getFilters() {
        return filters;
    }

    public void setFilters(RoleFilters filters) {
        this.filters = filters;
    }

    public List<String> getAvailablePerformers() {
        return availablePerformers;
    }

    public void setAvailablePerformers(List<String> availablePerformers) {
        this.availablePerformers = availablePerformers;
    }

    public List<String> getConfirmedPerformers() {
        return confirmedPerformers;
    }

    public void setConfirmedPerformers(List<String> confirmedPerformers) {
        this.confirmedPerformers = confirmedPerformers;
    }
}

