package ru.sber.backend.services;

import org.springframework.mail.SimpleMailMessage;
import ru.sber.backend.models.OrderResponse;

/**
 * Сервис отправки письма на электронную почту
 */
public interface EmailService {
    /**
     * Отправляет письмо на указанную электронную почту
     *
     * @param email электронная почта клиента
     */
    void sendEmail(SimpleMailMessage email);

    /**
     * Отправляет электронный чек на почту
     *
     * @param order созданный заказ
     */
    void sendOrderConfirmation(OrderResponse order);
}
