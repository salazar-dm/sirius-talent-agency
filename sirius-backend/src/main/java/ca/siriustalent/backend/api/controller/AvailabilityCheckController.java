package ca.siriustalent.backend.api.controller;

import ca.siriustalent.backend.exception.EmailFailureException;
import ca.siriustalent.backend.model.dao.ProjectDayRepository;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.model.entities.ProjectDay;
import ca.siriustalent.backend.model.entities.ProjectRole;
import ca.siriustalent.backend.service.UserService;
import ca.siriustalent.backend.utils.EmailUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/action/availability-check")
@RequiredArgsConstructor
public class AvailabilityCheckController {
    private final UserService userService;
    private final EmailUtil emailUtil;
    private final ProjectDayRepository projectDayRepository;

    @PostMapping("/send")
    public ResponseEntity<Void> sendAvailabilityCheck(@RequestBody ProjectDay projectDay) {
        List<ProjectRole> roles = projectDay.getRoles();
        if (roles == null) return ResponseEntity.badRequest().build();

        for (ProjectRole role : roles) {
            if (role.getForAvailabilityCheck().isEmpty()) continue;

            for (String performerId : role.getForAvailabilityCheck()) {
                LocalUser user = userService.getUserById(performerId).orElse(null);
                if (user == null) continue;

                String email = user.getEmail();
                String subject = "Availability Check: " + projectDay.getTitle() + " - " + role.getName();
                String text = "Please confirm your availability for: " + projectDay.getTitle()
                        + ". <br/>Location: " + projectDay.getLocation()
                        + "<br/>Role: " + role.getName()
                        + "<br/>Rate: " + projectDay.getRate();
                String link = "https://siriustalent.ca/availability/confirm/"
                        + projectDay.getId() + "/"
                        + role.getName() + "/"
                        + performerId;

                try {
                    emailUtil.sendAvailabilityCheckEmail(email, subject, text, link);
                } catch (EmailFailureException e) {
                    System.err.println("Failed to send availability email to: " + email + " | reason: " + e.getMessage());
                }
            }
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/confirm/{projectDayId}/{roleName}/{performerId}")
    public ResponseEntity<String> confirmAvailability(
            @PathVariable String projectDayId,
            @PathVariable String roleName,
            @PathVariable String performerId
    ) {
        ProjectDay day = projectDayRepository.findById(projectDayId).orElse(null);
        if (day == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ProjectDay not found");

        ProjectRole currentRole = day.getRoles().stream()
                .filter(role -> role.getName().equalsIgnoreCase(roleName))
                .findFirst()
                .orElse(null);

        if (currentRole == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Role not found");

        if (currentRole.getForAvailabilityCheck().contains(performerId)) {
            currentRole.getForAvailabilityCheck().remove(performerId);
            currentRole.getAvailablePerformers().add(performerId);
            projectDayRepository.save(day);
            return ResponseEntity.ok("Availability confirmed. Thank you.");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Performer not found in availability check list");
    }



}
