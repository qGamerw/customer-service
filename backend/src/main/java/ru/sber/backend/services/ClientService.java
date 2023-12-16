package ru.sber.backend.services;

import ru.sber.backend.entities.User;

import java.util.Optional;

/**
 * Сервис для взаимодействия с пользователем
 */
public interface ClientService {
    /**
     * Регистрирует пользователя
     *
     * @param client Данные о пользователе
     * @return Возвращает идентификатор созданного пользователя
     */
    String signUp(User client);

    /**
     * Производит поиск пользователя по id
     *
     * @return Возвращает найденного пользователя
     */
    Optional<User> getClientById();

    /**
     * Проверяет существует ли пользователь
     *
     * @return Возвращает результат проверки
     */
    boolean checkClientExistence();

    /**
     * Удаляет пользователя по id
     *
     * @return true при удачном удалении и false, если пользователя не существует
     */
    boolean deleteClientById();


    /**
     * Ищет клиента по токену для сброса пароля
     *
     * @param resetToken токен для сброса пароля
     * @return пользователь
     */
    Optional<User> findUserByResetToken(String resetToken);
}
