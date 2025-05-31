package ca.siriustalent.backend.service;

import ca.siriustalent.backend.api.model.ProjectBody;
import ca.siriustalent.backend.model.dao.CastingRepository;
import ca.siriustalent.backend.model.dao.ProjectRepository;
import ca.siriustalent.backend.model.entities.Casting;
import ca.siriustalent.backend.model.entities.Project;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CastingService {

    private final CastingRepository castingRepository;
    private final ProjectRepository projectRepository;

    public CastingService(CastingRepository castingRepository, ProjectRepository projectRepository) {
        this.castingRepository = castingRepository;
        this.projectRepository = projectRepository;
    }

    public Project createProjectForCasting(String castingId, ProjectBody projectBody) {
        Optional<Casting> castingOptional = castingRepository.findById(castingId);

        if (castingOptional.isEmpty()) {
            throw new RuntimeException("Casting not found with id: " + castingId);
        }

        Project project = new Project();
        project.setName(projectBody.getName());
        project.setCastingId(castingId);

        return projectRepository.save(project);
    }

    public Project getProjectById(String id) {
        return projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public List<Project> getProjectsByCastingId(String castingId) {
        return projectRepository.findByCastingId(castingId).get();
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}
