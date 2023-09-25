package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.Cart;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findCartByClient_IdAndDishIdsContains(long dishId, long clientId);

    void deleteCartByClientId(long clientId);

    int countCartsByClient_Id(long clientId);

    Optional<Cart> findCartByClient_Id(long clientId);

}
