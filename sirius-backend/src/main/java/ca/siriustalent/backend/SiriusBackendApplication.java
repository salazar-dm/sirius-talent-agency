package ca.siriustalent.backend;

import ca.siriustalent.backend.utils.EnvUtil;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SiriusBackendApplication {
    public static void main(String[] args) {
        // Загружаем переменные в System (Spring тянет оттуда)
        setEnv("MONGODB_URI");
        setEnv("ENCRYPTION_SALT_ROUNDS");
        setEnv("SESSION_COOKIE_NAME");
        setEnv("SESSION_COOKIE_MAX_AGE");
        setEnv("EMAIL_FROM");
        setEnv("APP_FRONTEND_URL");
        setEnv("SYSTEM_ADMIN_EMAIL");
        setEnv("SENDGRID_API_KEY");
        setEnv("SENDGRID_SENDER_EMAIL");
        setEnv("STRIPE_SECRET_KEY");
        setEnv("STRIPE_PUBLISHABLE_KEY");
        setEnv("CLOUDINARY_CLOUD_NAME");
        setEnv("CLOUDINARY_API_KEY");
        setEnv("CLOUDINARY_API_SECRET");
        setEnv("EMAIL_PASSWORD");

        SpringApplication.run(SiriusBackendApplication.class, args);
    }

    private static void setEnv(String key) {
        String value = EnvUtil.get(key);
        if (value != null) {
            System.setProperty(key, value);
        }
    }
}

