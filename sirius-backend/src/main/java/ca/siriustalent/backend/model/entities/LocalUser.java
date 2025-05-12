package ca.siriustalent.backend.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "local_user")
public class LocalUser {

    @Id
    private String id;

    private String tel;

    private String password;

    private String email;

    private Boolean emailVerified = false;

    private boolean userActivated = false;

    private boolean testPassed = false;

    private Boolean submissionPending = false;

    private String role;

    private PerformerProfile performerProfile;

    @JsonIgnore
    private String stripeCustomerId;

    private List<ProductionDay> productionDays;

    public List<ProductionDay> getProductionDays() {
        return productionDays;
    }

    public void setProductionDays(List<ProductionDay> productionDays) {
        this.productionDays = productionDays;
    }

    public String getStripeCustomerId() {
        return stripeCustomerId;
    }

    public void setStripeCustomerId(String stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
    }

    public boolean isSubmissionPending() {
        return submissionPending;
    }

    public void setSubmissionPending(boolean submissionPending) {
        this.submissionPending = submissionPending;
    }

    public PerformerProfile getProfile() {
        return performerProfile;
    }

    public void setProfile(PerformerProfile performerProfile) {
        this.performerProfile = performerProfile;
    }

    public boolean isUserActivated() {
        return userActivated;
    }

    public void setUserActivated(boolean userActivated) {
        this.userActivated = userActivated;
    }

    public boolean isTestPassed() {
        return testPassed;
    }

    public void setTestPassed(boolean testPassed) {
        this.testPassed = testPassed;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public Boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
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
}