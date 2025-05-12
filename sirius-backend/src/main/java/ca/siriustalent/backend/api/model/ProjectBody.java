package ca.siriustalent.backend.api.model;

public class ProjectBody {
    private String name;
    private String castingId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCastingId() {
        return castingId;
    }

    public void setCastingId(String castingId) {
        this.castingId = castingId;
    }
}

