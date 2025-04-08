package ca.siriustalent.backend.exception;

public class ProductionDayAlreadyExistsException extends RuntimeException {

    public ProductionDayAlreadyExistsException(String message) {
        super(message);
    }
}
