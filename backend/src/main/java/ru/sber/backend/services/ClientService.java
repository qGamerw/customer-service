package ru.sber.backend.services;

import ru.sber.backend.entities.User;

import java.util.Date;
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
     * @param clientId Уникальный идентификатор пользователя
     * @return Возвращает найденного пользователя
     */
    Optional<User> getClientById(String clientId);

    /**
     * Проверяет существует ли пользователь
     *
     * @param clientId Уникальный идентификатор пользователя
     * @return Возвращает результат проверки
     */
    boolean checkClientExistence(String clientId);

    /**
     * Удаляет пользователя по id
     *
     * @param clientId Уникальный идентификатор пользователя
     * @return true при удачном удалении и false, если пользователя не существует
     */
    boolean deleteClientById(String clientId);

    /**
     * Получает клиента по его email
     *
     * @param email электронная почта клиента
     * @return клиента по email
     */
    Optional<User> getClientByEmail(String email);

    /**
     * Обновялет информацию о клиенте
     *
     * @param clientId id клиента
     * @param name имя клиента
     * @param dateOfBirth дата рождения клиента
     * @param number номер телефона клиента
     * @return true, если информация о клиенте успешно обновлена
     */
    boolean updateClientInfo(String clientId, String name, Date dateOfBirth, String number);

    /**
     * Ищет клиента по токену для сброса пароля
     *
     * @param resetToken токен для сброса пароля
     * @return пользователь
     */
    Optional<User> findUserByResetToken(String resetToken);
}
