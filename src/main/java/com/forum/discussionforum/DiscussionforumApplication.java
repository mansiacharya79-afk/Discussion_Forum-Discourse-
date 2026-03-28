package com.forum.discussionforum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.forum.discussionforum"})
@EnableJpaRepositories(basePackages = "com.forum.discussionforum.repository")
public class DiscussionforumApplication {

public static void main(String[] args) {
SpringApplication.run(DiscussionforumApplication.class, args);
}

}
