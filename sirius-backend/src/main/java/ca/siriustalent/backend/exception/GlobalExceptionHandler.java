package ca.siriustalent.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.nio.file.AccessDeniedException;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDeniedException(AccessDeniedException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied" + e.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource not found" + e.getMessage());
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed" + e.getMessage());
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExists(UserAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists" + e.getMessage());
    }

    @ExceptionHandler(EmailFailureException.class)
    public ResponseEntity<String> handleEmailFailureException(EmailFailureException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email failure" + e.getMessage());
    }

    @ExceptionHandler(NoMorePerformersNeededException.class)
    public ResponseEntity<String> handleNoMorePerformersNeededException(NoMorePerformersNeededException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No more performers needed for " + e.getMessage());
    }

    @ExceptionHandler(ProductionDayAlreadyExistsException.class)
    public ResponseEntity<String> handleProductionDayAlreadyExistsException(ProductionDayAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Production day already exists" + e.getMessage());
    }

    @ExceptionHandler(S3Exception.class)
    public ResponseEntity<String> handleS3Exception(S3Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("S3 failure" + e.getMessage());
    }

    @ExceptionHandler(CloudinaryException.class)
    public ResponseEntity<String> handleCloudinaryException(CloudinaryException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cloudinary failure" + e.getMessage());
    }
}
