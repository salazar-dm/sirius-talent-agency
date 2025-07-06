package ca.siriustalent.backend.service;

import ca.siriustalent.backend.api.model.ProjectDayBody;
import ca.siriustalent.backend.model.dao.ProjectDayRepository;
import ca.siriustalent.backend.model.entities.ProjectDay;
import ca.siriustalent.backend.utils.ProjectDayMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectDayService {

    private final ProjectDayRepository projectDayRepository;

    public ProjectDayService(ProjectDayRepository projectDayRepository) {
        this.projectDayRepository = projectDayRepository;
    }

    public ProjectDay createDay(String projectId, ProjectDayBody body) {
        ProjectDay day = new ProjectDay();

        day.setProjectId(projectId);
        day.setTitle(body.getTitle());
        day.setDates(body.getDates());
        day.setLocation(body.getLocation());
        day.setNotes(body.getNotes());
        day.setRate(body.getRate());
        day.setShuttle(body.getShuttle());
        day.setRequiredDocuments(body.getRequiredDocuments());

        if (body.getCall() != null) {
            day.setCall(ProjectDayMapper.mapCallBodyToEntity(body.getCall()));
        }

        if (body.getFitting() != null) {
            day.setFitting(ProjectDayMapper.mapFittingBodyToEntity(body.getFitting()));
        }

        if (body.getRoles() != null) {
            day.setRoles(
                    body.getRoles().stream()
                            .map(ProjectDayMapper::mapRoleBodyToEntity)
                            .collect(Collectors.toList())
            );
        }

        return projectDayRepository.save(day);
    }

    public List<ProjectDay> getDaysByProjectId(String projectId) {
        return projectDayRepository.findByProjectId(projectId);
    }

    public ProjectDay getDayById(String id) {
        return projectDayRepository.findById(id).orElse(null);
    }

    public ProjectDay updateDay(String projectId, String dayId, ProjectDay updatedDay) {
        ProjectDay existing = getDayById(dayId);
        updatedDay.setId(existing.getId());
        updatedDay.setProjectId(projectId);
        return projectDayRepository.save(updatedDay);
    }

}

