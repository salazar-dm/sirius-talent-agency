package ca.siriustalent.backend.api.model;

import ca.siriustalent.backend.model.entities.PerformerProfile;

import java.util.List;

public class LocalUserBody {

    private String id;
    private String tel;
    private String email;
    private String password;
    private boolean emailVerified;
    private boolean testPassed;
    private boolean userActivated;
    private ProfileBody performerProfile;
    private String submissionPending;
    private String reason;
    private String role;
    private List<ProductionDayBody> productionDays;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getTel() {
        return tel;
    }
    public void setTel(String tel) {
        this.tel = tel;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public boolean isEmailVerified() {
        return emailVerified;
    }
    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }
    public boolean isTestPassed() {
        return testPassed;
    }
    public void setTestPassed(boolean testPassed) {
        this.testPassed = testPassed;
    }
    public boolean isUserActivated() {
        return userActivated;
    }
    public void setUserActivated(boolean userActivated) {
        this.userActivated = userActivated;
    }

    public ProfileBody getProfile() {
        return performerProfile;
    }
    public void setPerformerProfile(ProfileBody performerProfile) {
        this.performerProfile = performerProfile;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public String getSubmissionPending() {
        return submissionPending;
    }
    public void setSubmissionPending(String submissionPending) {
        this.submissionPending = submissionPending;
    }
    public String getReason() {
        return reason;
    }
    public void setReason(String reason) {
        this.reason = reason;
    }

    public List<ProductionDayBody> getProductionDays() {
        return productionDays;
    }
    public void setProductionDays(List<ProductionDayBody> productionDays) {
        this.productionDays = productionDays;
    }
}
