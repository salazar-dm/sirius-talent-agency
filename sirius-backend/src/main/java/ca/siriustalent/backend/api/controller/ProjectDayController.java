package ca.siriustalent.backend.api.controller;

import ca.siriustalent.backend.api.model.ProjectDayBody;
import ca.siriustalent.backend.model.entities.ProjectDay;
import ca.siriustalent.backend.service.ProjectDayService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
public class ProjectDayController {

    private final ProjectDayService projectDayService;

    public ProjectDayController(ProjectDayService projectDayService) {
        this.projectDayService = projectDayService;
    }

    @PostMapping("/{projectId}/create-day")
    public ResponseEntity<?> createProjectDay(
            @PathVariable String projectId,
            @RequestBody ProjectDayBody projectDayBody
    ) {
        try {
            ProjectDay createdDay = projectDayService.createDay(projectId, projectDayBody);
            return ResponseEntity.ok(createdDay.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to create project day: " + e.getMessage());
        }
    }

    @GetMapping("/{projectId}/days")
    public ResponseEntity<?> getProjectDaysByProjectId(@PathVariable String projectId) {
        try {
            List<ProjectDay> projectDays = projectDayService.getDaysByProjectId(projectId);
            return ResponseEntity.ok(projectDays);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to fetch project days: " + e.getMessage());
        }
    }

    @GetMapping("/{projectId}/day/{dayId}")
    public ResponseEntity<ProjectDay> getProjectDayById(
            @PathVariable String projectId,
            @PathVariable String dayId
    ) {
            ProjectDay day = projectDayService.getDayById(dayId);
            return ResponseEntity.ok(day);
    }

    @PutMapping("/{projectId}/day/{dayId}")
    public ResponseEntity<?> updateProjectDay(
            @PathVariable String projectId,
            @PathVariable String dayId,
            @RequestBody ProjectDay updatedDay
    ) {
        try {
            ProjectDay saved = projectDayService.updateDay(projectId, dayId, updatedDay);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to update project day: " + e.getMessage());
        }
    }



}

