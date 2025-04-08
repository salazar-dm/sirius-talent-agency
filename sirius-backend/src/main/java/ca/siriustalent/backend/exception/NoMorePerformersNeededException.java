package ca.siriustalent.backend.exception;

public class NoMorePerformersNeededException extends RuntimeException {

    public NoMorePerformersNeededException(String message) {
        super(message);
    }
}
