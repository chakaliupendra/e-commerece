# Build the entire project using Maven inside a Docker container
docker run -it --rm -v ${PWD}:/app -w /app maven:3.8.4-openjdk-17-slim mvn clean install -DskipTests
