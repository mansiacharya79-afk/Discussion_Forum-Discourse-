package com.forum.discussionforum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.forum.discussionforum.model.Topic;
import com.forum.discussionforum.repository.TopicRepository;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    public Topic saveTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public Topic getTopicById(Long id) {
        return topicRepository.findById(id).orElse(null);
    }

    public void deleteTopic(Long id) {
        topicRepository.deleteById(id);
    }
}