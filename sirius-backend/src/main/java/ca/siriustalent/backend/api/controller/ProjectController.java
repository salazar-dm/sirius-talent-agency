package ca.siriustalent.backend.api.controller;

import ca.siriustalent.backend.api.model.ProjectBody;
import ca.siriustalent.backend.model.entities.Project;
import ca.siriustalent.backend.service.CastingService;
import ca.siriustalent.backend.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    private final CastingService castingService;
    private JwtUtil jwtUtil;

    public ProjectController(CastingService castingService, JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
        this.castingService = castingService;
    }

    @PostMapping("/create/{castingId}")
    public ResponseEntity<Map<String, String>> createProject(
            @PathVariable String castingId,
            @RequestBody ProjectBody projectBody
    ) {
        try {
            Project project = castingService.createProjectForCasting(castingId, projectBody);
            String token = jwtUtil.generateToken(castingId, "Casting");

            Map<String, String> response = new HashMap<>();
            response.put("id", project.getId());
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to create project: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<?> readProjectById(
            @PathVariable String id,
            @RequestHeader("Authorization") String jwtToken
    ) {
        try {
            String token = jwtToken.replace("Bearer ", "");
            jwtUtil.extractSubject(token);

            Project project = castingService.getProjectById(id);
            return ResponseEntity.ok(project);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }
    }

    @GetMapping("/read/all")
    public ResponseEntity<?> readAllProjects(
            @RequestHeader("Authorization") String jwtToken
    ) {
        try {
            String token = jwtToken.replace("Bearer ", "");
            String castingId = jwtUtil.extractSubject(token);

            List<Project> projects = castingService.getProjectsByCastingId(castingId);
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }
    }


}
