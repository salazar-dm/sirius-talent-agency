package ca.siriustalent.backend.api.controller;

import ca.siriustalent.backend.service.CloudinaryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@Validated
@RequestMapping("/api/cdn")
public class CdnController {
    private CloudinaryService cloudinaryService;

    public CdnController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/upload-performer-profile-picture")
    public ResponseEntity<String> uploadHeadshot(
            @RequestHeader("Authorization") String jwtToken,
            @RequestParam("file") MultipartFile file) {

        if (jwtToken == null || !jwtToken.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing Authorization header.");
        }

        try {
            String url = cloudinaryService.uploadPerformerImage(jwtToken.substring(7), file, "headshot");
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @PostMapping("/upload-performer-fullbody-picture")
    public ResponseEntity<String> uploadFullBody(
            @RequestHeader("Authorization") String jwtToken,
            @RequestParam("file") MultipartFile file) {

        if (jwtToken == null || !jwtToken.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing Authorization header.");
        }

        try {
            String url = cloudinaryService.uploadPerformerImage(jwtToken.substring(7), file, "full-body");
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @PostMapping("/upload-performer-document-picture")
    public ResponseEntity<String> uploadDocument(
            @RequestHeader("Authorization") String jwtToken,
            @RequestParam("file") MultipartFile file) {

        if (jwtToken == null || !jwtToken.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing Authorization header.");
        }

        try {
            String url = cloudinaryService.uploadPerformerImage(jwtToken.substring(7), file, "document");
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @PostMapping("/upload-performer-actra-card-picture")
    public ResponseEntity<String> uploadActraCard(
            @RequestHeader("Authorization") String jwtToken,
            @RequestParam("file") MultipartFile file) {

        if (jwtToken == null || !jwtToken.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing Authorization header.");
        }

        try {
            String url = cloudinaryService.uploadPerformerImage(jwtToken.substring(7), file, "actra-card");
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @PostMapping("/upload-performer-whasa-picture")
    public ResponseEntity<String> uploadWhasa(
            @RequestHeader("Authorization") String jwtToken,
            @RequestParam("file") MultipartFile file) {

        if (jwtToken == null || !jwtToken.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing Authorization header.");
        }

        try {
            String url = cloudinaryService.uploadPerformerImage(jwtToken.substring(7), file, "whasa");
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

}
