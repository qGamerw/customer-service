package ru.sber.backend.services;

import ru.sber.backend.entities.Notify;

import java.util.List;

/**
 * Сервис для уведомления о заказах клиента
 */
public interface NotifyService {
    /**
     * Создает уведомление для пользователя
     * @param notify уведомление
     * @return true в случае успеха
     */
    boolean create(Notify notify);

    /**
     * Удаляет уведомление пользователя
     * @param idNotify индификатор уведомления
     * @return true в случае успеха
     */
    boolean delete(long idNotify);

    /**
     * Ищет все уведомления по id пользователя
     * @return список уведомлений
     */
    List<Notify> findNotifyByClientId();
}
