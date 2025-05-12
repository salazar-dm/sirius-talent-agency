package ca.siriustalent.backend.api.model;

import java.util.List;

public class ProjectDayBody {
    private String projectId;
    private String title;
    private List<String> dates; // ISO date strings
    private String location;
    private String notes;
    private String rate;
    private String shuttle;
    private String requiredDocuments;
    private ProjectDayCallBody call;
    private ProjectDayFittingBody fitting;
    private List<ProjectRoleBody> roles;

    // --- Getters and Setters ---

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getDates() {
        return dates;
    }

    public void setDates(List<String> dates) {
        this.dates = dates;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public String getShuttle() {
        return shuttle;
    }

    public void setShuttle(String shuttle) {
        this.shuttle = shuttle;
    }

    public String getRequiredDocuments() {
        return requiredDocuments;
    }

    public void setRequiredDocuments(String requiredDocuments) {
        this.requiredDocuments = requiredDocuments;
    }

    public ProjectDayCallBody getCall() {
        return call;
    }

    public void setCall(ProjectDayCallBody call) {
        this.call = call;
    }

    public ProjectDayFittingBody getFitting() {
        return fitting;
    }

    public void setFitting(ProjectDayFittingBody fitting) {
        this.fitting = fitting;
    }

    public List<ProjectRoleBody> getRoles() {
        return roles;
    }

    public void setRoles(List<ProjectRoleBody> roles) {
        this.roles = roles;
    }
}

