package ca.siriustalent.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SiriusBackendApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

        // MongoDB
        System.setProperty("MONGODB_URI", dotenv.get("MONGODB_URI"));

        // Encryption
        System.setProperty("ENCRYPTION_SALT_ROUNDS", dotenv.get("ENCRYPTION_SALT_ROUNDS"));

        // Session
        System.setProperty("SESSION_COOKIE_NAME", dotenv.get("SESSION_COOKIE_NAME"));
        System.setProperty("SESSION_COOKIE_MAX_AGE", dotenv.get("SESSION_COOKIE_MAX_AGE"));

        // Email and frontend
        System.setProperty("EMAIL_FROM", dotenv.get("EMAIL_FROM"));
        System.setProperty("APP_FRONTEND_URL", dotenv.get("APP_FRONTEND_URL"));
        System.setProperty("SYSTEM_ADMIN_EMAIL", dotenv.get("SYSTEM_ADMIN_EMAIL"));

        // SendGrid
        System.setProperty("SENDGRID_API_KEY", dotenv.get("SENDGRID_API_KEY"));
        System.setProperty("SENDGRID_SENDER_EMAIL", dotenv.get("SENDGRID_SENDER_EMAIL"));

        // Stripe
        System.setProperty("STRIPE_SECRET_KEY", dotenv.get("STRIPE_SECRET_KEY"));
        System.setProperty("STRIPE_PUBLISHABLE_KEY", dotenv.get("STRIPE_PUBLISHABLE_KEY"));

        // Cloudinary
        System.setProperty("CLOUDINARY_CLOUD_NAME", dotenv.get("CLOUDINARY_CLOUD_NAME"));
        System.setProperty("CLOUDINARY_API_KEY", dotenv.get("CLOUDINARY_API_KEY"));
        System.setProperty("CLOUDINARY_API_SECRET", dotenv.get("CLOUDINARY_API_SECRET"));

        SpringApplication.run(SiriusBackendApplication.class, args);
    }

}
