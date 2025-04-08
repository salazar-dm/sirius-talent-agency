package ca.siriustalent.backend.api.controller;

import jakarta.annotation.security.RolesAllowed;
import ca.siriustalent.backend.api.model.ProfileBody;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.model.entities.PerformerProfile;
import ca.siriustalent.backend.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/performer")
public class PerformerController {

    private ProfileService profileService;

    public PerformerController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/create-profile")
    public ResponseEntity<PerformerProfile> createProfile(@RequestBody ProfileBody profileBody, @RequestHeader("Authorization") String authorization) {
        String token = authorization.replace("Bearer ", "");
        PerformerProfile performerProfile = profileService.createProfile(token, profileBody);
        return new ResponseEntity<>(performerProfile, HttpStatus.CREATED);
    }

    @GetMapping("/get-profile")
    public ResponseEntity<PerformerProfile> getProfile(@RequestHeader("Authorization") String authorization) {
        System.out.println(authorization);
        String token = authorization.replace("Bearer ", "");
        PerformerProfile profile = profileService.getProfile(token);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/get-user")
    public ResponseEntity<LocalUser> getUser(@RequestHeader("Authorization") String authorization) {
        String token = authorization.replace("Bearer ", "");
        LocalUser user = profileService.getUser(token);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/delete-profile")
    @RolesAllowed("Admin")
    public ResponseEntity<Void> deleteProfile(@RequestHeader("Authorization") String authorization) {
        String token = authorization.replace("Bearer ", "");
        profileService.deleteProfile(token);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update-profile")
    public ResponseEntity<String> updateProfile(@RequestBody ProfileBody profileBody, @RequestHeader("Authorization") String jwtToken) {
        if (jwtToken == null || !jwtToken.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing Authorization header.");
        }

        String token = jwtToken.replace("Bearer ", "");

        try {
            profileService.updateProfile(token, profileBody);
            return new ResponseEntity<>("Profile updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
