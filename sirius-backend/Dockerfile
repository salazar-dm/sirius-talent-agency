# force rebuild
# Базовый образ Oracle JDK 22
FROM eclipse-temurin:21-jdk

# Рабочая директория
WORKDIR /app

# Копируем всё содержимое проекта внутрь контейнера
COPY . .

RUN chmod +x mvnw

# Сборка через Maven Wrapper (если ты его используешь)
RUN ./mvnw clean install -DskipTests

# Запуск собранного JAR-а
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]

