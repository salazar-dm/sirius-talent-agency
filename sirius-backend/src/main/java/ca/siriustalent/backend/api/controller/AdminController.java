package ca.siriustalent.backend.api.controller;

import ca.siriustalent.backend.api.model.LocalUserBody;
import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get-user/{id}")
    public ResponseEntity<LocalUser> adminGetUser(@PathVariable String id) {
        LocalUser user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<LocalUser>> adminGetAllUsers() {
        List<LocalUser> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/create-user")
    public ResponseEntity<LocalUser> adminCreateUser(@RequestBody LocalUserBody localUserBody, @RequestParam boolean isEmailVerified, @RequestParam String role) {
        userService.createUser(localUserBody);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update-user")
    public ResponseEntity<LocalUser> adminUpdateUser(@RequestBody LocalUserBody localUserBody) {
        LocalUser user = userService.updateUser(localUserBody);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<HttpStatus> adminDeleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/get-all-by-role/{role}")
    public ResponseEntity<List<LocalUser>> getAllByRole(@PathVariable String role) {
        List<LocalUser> users = userService.getAllUsersByRole(role);
        return ResponseEntity.ok(users);
    }

}
