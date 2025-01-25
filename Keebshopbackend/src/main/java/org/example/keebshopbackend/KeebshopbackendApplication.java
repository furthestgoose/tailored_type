package org.example.keebshopbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "org.example.keebshopbackend.repository")
public class KeebshopbackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(KeebshopbackendApplication.class, args);
    }

}
