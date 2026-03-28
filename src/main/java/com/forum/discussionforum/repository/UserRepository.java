package com.forum.discussionforum.repository;

import com.forum.discussionforum.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}