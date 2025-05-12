package ca.siriustalent.backend.api.model;

import java.util.List;

public class ProjectRoleBody {
    private String name;
    private int quota;
    private RoleFiltersBody filters;
    private List<String> availablePerformers;
    private List<String> confirmedPerformers;

    // --- Getters and setters ---

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

    public RoleFiltersBody getFilters() {
        return filters;
    }

    public void setFilters(RoleFiltersBody filters) {
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

