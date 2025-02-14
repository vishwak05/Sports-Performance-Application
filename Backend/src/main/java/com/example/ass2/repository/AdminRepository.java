package com.example.ass2.repository;

import com.example.ass2.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// AdminRepository.java
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsernameAndEmailAndPassword(String username, String email, String password);

    Admin findByEmailAndPassword(String email, String password);
}

