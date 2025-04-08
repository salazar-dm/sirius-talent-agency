package ca.siriustalent.backend.exception;

public class EmailFailureException extends RuntimeException {

    public EmailFailureException(String message) {
        super(message);
    }
}
