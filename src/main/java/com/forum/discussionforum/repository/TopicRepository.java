package com.forum.discussionforum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.forum.discussionforum.model.Topic;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
}