package ca.siriustalent.backend.model.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document(collection = "project_days")
public class ProjectDay {

    @Id
    private String id;

    private String projectId;

    private String title;

    private List<String> dates; // предполагается ISO date string (yyyy-MM-dd)

    private String location;

    private String notes;

    private String rate;

    private String shuttle;

    private String requiredDocuments;

    private ProjectDayCall call;

    private ProjectDayFitting fitting;

    private List<ProjectRole> roles;
}

