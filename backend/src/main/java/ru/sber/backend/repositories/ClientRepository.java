package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.User;

import java.util.Optional;

/**
 * Репозиторий для взаимодействия с клиентом
 */
@Repository
public interface ClientRepository extends JpaRepository<User, Long> {
    /**
     * Ищет клиента по email и паролю
     *
     * @param email электронная почта клиента
     * @param password пароль клиента
     * @return пользователя
     */
    Optional<User> findUserByEmailAndPassword(String email, String password);

    /**
     * Ищет клиента по имени
     *
     * @param username имя клиента
     * @return пользователь
     */
    Optional<User> findByUsername(String username);

    /**
     * Ищет клиента по email
     *
     * @param email электронная почта клиента
     * @return пользователь
     */
    Optional<User> findUserByEmail(String email);

    /**
     * Проверяет существует ли пользователь с указанным email
     *
     * @param email электронная почта клиента
     * @return true, если пользователь существует
     */
    Boolean existsByEmail(String email);

    /**
     * Ищет пользователя по токену для сброса пароля
     *
     * @param resetToken токен для сброса пароля
     * @return пользователь
     */
    Optional<User> findByResetToken(String resetToken);
}
