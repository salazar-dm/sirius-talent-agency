package ca.siriustalent.backend.api.controller;

import ca.siriustalent.backend.model.dao.ProjectDayRepository;
import ca.siriustalent.backend.model.entities.ProjectDay;
import ca.siriustalent.backend.model.entities.ProjectRole;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final ProjectDayRepository projectDayRepository;

    @GetMapping("/availability/confirm/{projectDayId}/{roleName}/{performerId}")
    public ResponseEntity<String> confirmAvailability(
            @PathVariable String projectDayId,
            @PathVariable String roleName,
            @PathVariable String performerId
    ) {
        ProjectDay day = projectDayRepository.findById(projectDayId).orElse(null);
        if (day == null) return ResponseEntity.status(404).body("ProjectDay not found");

        ProjectRole currentRole = day.getRoles().stream()
                .filter(role -> role.getName().equalsIgnoreCase(roleName))
                .findFirst()
                .orElse(null);

        if (currentRole == null)
            return ResponseEntity.status(404).body("Role not found");

        boolean match = currentRole.getForAvailabilityCheck().stream()
                .anyMatch(id -> id.toString().equals(performerId));

        if (match) {
            currentRole.getForAvailabilityCheck().remove(performerId);
            currentRole.getAvailablePerformers().add(performerId);
            projectDayRepository.save(day);
            return ResponseEntity.ok("Availability confirmed. Thank you.");
        }

        return ResponseEntity.status(404).body("You have already been confirmed.");
    }
}
