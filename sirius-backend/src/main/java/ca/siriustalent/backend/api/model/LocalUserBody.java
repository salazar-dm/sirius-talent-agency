package ca.siriustalent.backend.api.model;

public class LocalUserBody {

    private String id;
    private String tel;
    private String email;
    private String password;
    private boolean emailVerified;
    private boolean userActivated;
    private String role;

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
    public boolean isUserActivated() {
        return userActivated;
    }
    public void setUserActivated(boolean userActivated) {
        this.userActivated = userActivated;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
}
