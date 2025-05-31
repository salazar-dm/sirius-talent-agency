package ca.siriustalent.backend.utils;

import io.github.cdimascio.dotenv.Dotenv;

public class EnvUtil {
    private static final Dotenv dotenv = Dotenv.configure()
            .directory("sirius-backend")
            .filename(".env")
            .ignoreIfMissing()
            .load();

    public static String get(String key) {
        String fromEnv = System.getenv(key);
        if (fromEnv != null) return fromEnv;

        String fromDotenv = dotenv.get(key);
        if (fromDotenv != null) return fromDotenv;

        System.err.println("Missing env variable: " + key);
        return null;
    }
}
