package ca.siriustalent.backend.api.controller;

import ca.siriustalent.backend.api.model.LocalUserBody;
import ca.siriustalent.backend.exception.AuthenticationException;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.service.UserService;
import ca.siriustalent.backend.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verify(@RequestParam String token) {
        String authToken = userService.verify(token);
        return ResponseEntity.ok(authToken);
    }

    @PostMapping("/register")
    public ResponseEntity<LocalUser> register(@RequestBody LocalUserBody localUserBody) {
        LocalUser user = userService.register(localUserBody);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LocalUserBody localUserBody) {
        try {
            String authToken = userService.authenticate(localUserBody);
            return ResponseEntity.ok(authToken);
        } catch (AuthenticationException e) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestParam String token) {
        LocalUser user = userService.logout(token);
        String id = user.getId();
        return ResponseEntity.ok("User " + id + " logged out successfully");
    }

    @GetMapping("/get-current-user")
    public ResponseEntity<String> getCurrentUserRole(@RequestHeader("Authorization") String authorization) {
        String token = authorization.replace("Bearer ", "");
        String role = userService.getCurrentUserRole(token);
        return ResponseEntity.ok().body(role);
    }

    @GetMapping("/get-user")
    public ResponseEntity<LocalUser> getUser(@RequestHeader("Authorization") String authorization) {
        String token = authorization.replace("Bearer ", "");
        LocalUser user = userService.getUser(jwtUtil.extractSubject(token));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/activate")
    public ResponseEntity<String> activate(@RequestHeader("Authorization") String authorization) {
        String token = authorization.replace("Bearer ", "");
        LocalUser user = userService.activate(token);
        return ResponseEntity.ok("User activated successfully");
    }

}
