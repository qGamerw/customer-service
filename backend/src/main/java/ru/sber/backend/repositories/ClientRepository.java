package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.User;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByLoginAndPassword(String login, String password);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
