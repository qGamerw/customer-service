package ru.sber.backend.services;

import ru.sber.backend.entities.Payment;

/**
 * Сервис для оплаты товаров
 */
public interface PaymentService {

    /**
     * Совершает платеж
     *
     * @param payment Платеж
     * @return Возвращает статус выполнения платежа
     */
    boolean pay(Payment payment);

}
