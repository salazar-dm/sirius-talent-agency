package ca.siriustalent.backend.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.cglib.core.Local;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "production_day")
public class ProductionDay {

    @Id
    private String id;

    private String production;
    private LocalDate date;
    private String clientId;
    private String clientEmail;

    private List<Role> roles = new ArrayList<>();
    private List<Participant> participants = new ArrayList<>();
    private List<Participant> availableParticipants = new ArrayList<>();
    private List<Participant> confirmedParticipants = new ArrayList<>();
    private List<Participant> invoiceRequestedParticipants = new ArrayList<>();

    private String unionStatus;
    private String location;
    private String exterior;
    private boolean selfDriveOnly;
    private boolean newFacesOnly;
    private String notes;
    private String status;

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getUnionStatus() {
        return unionStatus;
    }

    public void setUnionStatus(String unionStatus) {
        this.unionStatus = unionStatus;
    }

    public List<Participant> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Participant> participants) {
        this.participants = participants;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientEmail() {
        return clientEmail;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getProduction() {
        return production;
    }

    public void setProduction(String production) {
        this.production = production;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public List<Participant> getAvailableParticipants() {
        return availableParticipants;
    }

    public void setAvailableParticipants(List<Participant> availableParticipants) {
        this.availableParticipants = availableParticipants;
    }

    public List<Participant> getConfirmedParticipants() {
        return confirmedParticipants;
    }

    public void setConfirmedParticipants(List<Participant> confirmedParticipants) {
        this.confirmedParticipants = confirmedParticipants;
    }

    public List<Participant> getInvoiceRequestedParticipants() {
        return invoiceRequestedParticipants;
    }

    public void setInvoiceRequestedParticipants(List<Participant> invoiceRequestedParticipants) {
        this.invoiceRequestedParticipants = invoiceRequestedParticipants;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getExterior() {
        return exterior;
    }

    public void setExterior(String exterior) {
        this.exterior = exterior;
    }

    public boolean isSelfDriveOnly() {
        return selfDriveOnly;
    }

    public void setSelfDriveOnly(boolean selfDriveOnly) {
        this.selfDriveOnly = selfDriveOnly;
    }

    public boolean isNewFacesOnly() {
        return newFacesOnly;
    }

    public void setNewFacesOnly(boolean newFacesOnly) {
        this.newFacesOnly = newFacesOnly;
    }
}