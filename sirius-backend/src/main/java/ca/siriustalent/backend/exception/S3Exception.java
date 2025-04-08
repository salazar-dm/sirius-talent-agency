package ca.siriustalent.backend.exception;

public class S3Exception extends RuntimeException {

    public S3Exception(String message) {
        super(message);
    }
}
