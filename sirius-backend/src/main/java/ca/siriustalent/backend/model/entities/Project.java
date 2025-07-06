package ca.siriustalent.backend.model.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = "projects")
public class Project {

    @Id
    private String id;

    private String name;
    private String castingId;

}

