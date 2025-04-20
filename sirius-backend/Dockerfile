# Базовый образ Oracle JDK 22
FROM ghcr.io/graalvm/jdk:22.0.1

# Рабочая директория
WORKDIR /app

# Копируем всё содержимое проекта внутрь контейнера
COPY . .

# Сборка через Maven Wrapper (если ты его используешь)
RUN ./mvnw clean install -DskipTests

# Запуск собранного JAR-а
CMD ["java", "-jar", "target/sirius-backend-0.0.1-SNAPSHOT.jar"]
