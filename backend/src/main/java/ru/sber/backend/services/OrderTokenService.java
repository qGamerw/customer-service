package ru.sber.backend.services;

import ru.sber.backend.entities.OrderToken;

import java.util.List;

public interface OrderTokenService {
    /**
     * сохраняет токен в БД
     *
     * @param orderToken - токен для клиента сервиса заказов
     * @return true в случае успеха
     */
    boolean save(OrderToken orderToken);

    /**
     * Возвращает токены клиента заказов
     *
     * @return токены
     */
    List<OrderToken> findAll();
}
