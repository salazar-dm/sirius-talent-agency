package ca.siriustalent.backend.api.controller;

import ca.siriustalent.backend.api.model.AdminEmailBody;
import ca.siriustalent.backend.api.model.LocalUserBody;
import ca.siriustalent.backend.exception.EmailFailureException;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.service.ProfileService;
import ca.siriustalent.backend.service.UserService;
import ca.siriustalent.backend.utils.EmailUtil;
import ca.siriustalent.backend.utils.JwtUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final ProfileService profileService;
    private final JwtUtil jwtUtil;
    private final EmailUtil emailUtil;

    public AdminController(UserService userService, JwtUtil jwtUtil, ProfileService profileService, EmailUtil emailUtil) {
        this.profileService = profileService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.emailUtil = emailUtil;
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(
            @RequestHeader(value = "Authorization", required = false) String jwtToken,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String query
    ) {
        if (jwtToken == null || !jwtToken.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing Authorization header.");
        }

        String token = jwtToken.replace("Bearer ", "");
        try {
            jwtUtil.extractSubject(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token.");
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        Page<LocalUser> userPage = (query != null && !query.trim().isEmpty())
                ? userService.searchUsers(query, pageable)
                : userService.getAllUsersByPageable(pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("content", userPage.getContent());
        response.put("currentPage", userPage.getNumber());
        response.put("totalItems", userPage.getTotalElements());
        response.put("totalPages", userPage.getTotalPages());
        response.put("hasNext", userPage.hasNext());
        response.put("hasPrevious", userPage.hasPrevious());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<LocalUser> getUserById(@PathVariable String id) {
        Optional<LocalUser> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<String> updateUserByAdmin(
            @PathVariable String id,
            @RequestBody LocalUserBody localUserBody
    ) {
        userService.update(id, localUserBody);
        profileService.updateProfileById(id, localUserBody.getProfile());

        return ResponseEntity.ok(localUserBody.toString());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUserByAdmin(@PathVariable String id) {
        Optional<LocalUser> optionalUser = userService.getUserById(id);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUserByAdmin(@RequestBody LocalUserBody localUserBody) {
        try {
            LocalUser newUser = userService.createUser(localUserBody, false);

            if (localUserBody.getProfile() != null) {
                profileService.updateProfileById(newUser.getId(), localUserBody.getProfile());
            }

            return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create user: " + e.getMessage());
        }
    }

    @PostMapping("/users/email-to")
    public ResponseEntity<?> sendCustomEmailToUser(@RequestBody AdminEmailBody adminEmailBody) {
        try {
            emailUtil.sendCustomEmail(
                    adminEmailBody.getEmail(),
                    adminEmailBody.getSubject(),
                    adminEmailBody.getBody()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body("Email sent successfully");
        } catch (EmailFailureException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
        }
    }
}
