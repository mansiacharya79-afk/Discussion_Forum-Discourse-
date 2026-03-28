package com.forum.discussionforum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.forum.discussionforum.model.Post;
import com.forum.discussionforum.repository.CommentRepository;
import com.forum.discussionforum.repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    public void deletePost(Long id) {
        commentRepository.deleteAll(commentRepository.findAll()
            .stream()
            .filter(c -> c.getPost() != null && c.getPost().getId().equals(id))
            .toList());
        postRepository.deleteById(id);
    }
}