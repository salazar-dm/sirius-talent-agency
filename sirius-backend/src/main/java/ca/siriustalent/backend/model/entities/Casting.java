package ca.siriustalent.backend.model.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "casting_directors")
@Getter
@Setter
public class Casting {

    @Id
    private String id;

    private String email;
    private String firstName;
    private String lastName;
    private String tel;
}

