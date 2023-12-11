package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.User;

import java.util.Optional;

/**
 * Репозиторий для взаимодействия с клиентом
 */
@Repository
public interface ClientRepository extends JpaRepository<User, String> {

    /**
     * Ищет пользователя по токену для сброса пароля
     *
     * @param resetToken токен для сброса пароля
     * @return пользователь
     */
    Optional<User> findByResetToken(String resetToken);
}
