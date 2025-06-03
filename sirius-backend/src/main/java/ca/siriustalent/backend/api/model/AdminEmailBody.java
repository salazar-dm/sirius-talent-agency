package ca.siriustalent.backend.api.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminEmailBody {
    private String email;
    private String subject;
    private String body;
}
