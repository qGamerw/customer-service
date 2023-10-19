package ru.sber.backend.services;
import org.springframework.mail.SimpleMailMessage;
import ru.sber.backend.models.DishOrder;
import ru.sber.backend.models.OrderResponse;

import java.math.BigDecimal;
import java.util.List;

/**
 * Сервис отправки письма на электронную почту
 */
public interface EmailService {
    /**
     * Отпрвляет письмо на указанную электронную почту
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
