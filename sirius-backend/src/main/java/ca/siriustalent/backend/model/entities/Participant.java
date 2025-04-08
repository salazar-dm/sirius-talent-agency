package ca.siriustalent.backend.model.entities;

public class Participant {

    private String id;
    private String role;
    private String draftCallTime;
    private String finalCallTime;
    private boolean commissionPaid;

    public Participant() {}

    public Participant(String role) {
        this.role = role;
        this.commissionPaid = false;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDraftCallTime() {
        return draftCallTime;
    }

    public void setDraftCallTime(String draftCallTime) {
        this.draftCallTime = draftCallTime;
    }

    public String getFinalCallTime() {
        return finalCallTime;
    }

    public void setFinalCallTime(String finalCallTime) {
        this.finalCallTime = finalCallTime;
    }

    public boolean isCommissionPaid() {
        return commissionPaid;
    }

    public void setCommissionPaid(boolean commissionPaid) {
        this.commissionPaid = commissionPaid;
    }
}