package ca.siriustalent.backend.model.dao;

import ca.siriustalent.backend.model.entities.ProjectDay;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectDayRepository extends MongoRepository<ProjectDay, String> {
    List<ProjectDay> findByProjectId(String projectId);
}
