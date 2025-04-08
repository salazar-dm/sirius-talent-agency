package ca.siriustalent.backend.api.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import ca.siriustalent.backend.model.entities.Participant;
import ca.siriustalent.backend.model.entities.Role;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class ProductionDayBody {
    @NotNull @NotBlank
    private String production;
    @NotNull @NotBlank
    private LocalDate date;
    @NotNull
    private List<Role> roles;
    @NotNull
    private List<Participant> participants;
    private List<Participant> availableParticipants;
    private List<Participant> confirmedParticipants;
    private List<Participant> invoiceRequestedParticipants;
    @NotNull @NotBlank
    private String unionStatus;
    @NotNull @NotBlank
    private String location;
    @NotNull @NotBlank
    private String exterior;
    @NotNull @NotBlank
    private boolean selfDriveOnly;
    @NotNull @NotBlank
    private boolean newFacesOnly;
    private String notes;

    public String getProduction() {
        return production;
    }
    public void setProduction(String production) {
        this.production = production;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public List<Participant> getParticipants() {
        return participants;
    }
    public void setParticipants(List<Participant> participants) {
        this.participants = participants;
    }
    public String getUnionStatus() {
        return unionStatus;
    }
    public void setUnionStatus(String unionStatus) {
        this.unionStatus = unionStatus;
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
    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
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
}
