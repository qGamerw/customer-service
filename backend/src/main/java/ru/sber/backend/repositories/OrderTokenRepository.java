package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.OrderToken;

@Repository
public interface OrderTokenRepository extends JpaRepository<OrderToken, Integer> {
}
