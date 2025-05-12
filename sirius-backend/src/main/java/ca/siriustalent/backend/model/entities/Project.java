package ca.siriustalent.backend.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "projects")
public class Project {

    @Id
    private String id;

    private String name;
    private String castingId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

