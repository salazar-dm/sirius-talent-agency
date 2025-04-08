package ca.siriustalent.backend.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Base64;

@Component
public class EncryptionUtil {

    private final PasswordEncoder passwordEncoder;

    public EncryptionUtil() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public String encodeId(String id) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(id.getBytes());
    }

    public static String decodeId(String encodedId) {
        return new String(Base64.getUrlDecoder().decode(encodedId));
    }

    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    public boolean matches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}