package ca.siriustalent.backend.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "project_days")
public class ProjectDay {

    @Id
    private String id;

    private String projectId;

    private String title;

    private List<String> dates; // предполагается ISO date string (yyyy-MM-dd)

    private String location;

    private String notes;

    private String rate;

    private String shuttle;

    private String requiredDocuments;

    private ProjectDayCall call;

    private ProjectDayFitting fitting;

    private List<ProjectRole> roles;

    // --- Getters and Setters ---

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public ProjectDayCall getCall() {
        return call;
    }

    public void setCall(ProjectDayCall call) {
        this.call = call;
    }

    public ProjectDayFitting getFitting() {
        return fitting;
    }

    public void setFitting(ProjectDayFitting fitting) {
        this.fitting = fitting;
    }

    public List<ProjectRole> getRoles() {
        return roles;
    }

    public void setRoles(List<ProjectRole> roles) {
        this.roles = roles;
    }
}

