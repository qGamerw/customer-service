package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.Cart;

import java.util.Optional;

/**
 * Репозиторий для взаимодействия с корзиной клиента
 */
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    /**
     * Получает корзину по id
     *
     * @param cartId уникальный идентификатор корзины
     * @return корзину
     */
    Optional<Cart> findCartById(long cartId);
}
