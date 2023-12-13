package ru.sber.backend.clients.orders;

import ru.sber.backend.models.Message;
import ru.sber.backend.models.OrderResponse;

import java.util.List;

/**
 * Получает информацию об order
 */
public interface OrderService {
    /**
     * Получает заказы клиента по ID клиента у сервиса заказов
     *
     * @return список заказов клиента
     */
    List<OrderResponse> getOrdersByClientId();

    /**
     * Создает заказ клиента и передает его сервису заказов
     *
     * @param orderResponse объект заказа
     * @return объект созданного заказа
     */
    Long createOrder(OrderResponse orderResponse);

    /**
     * Оплачивает заказ
     *
     * @param orderId ID оплачеваемого заказа
     */
    void paymentOfOrderById(Long orderId);

    /**
     * Отменяет заказ, обращаясь к сервису заказов
     *
     * @param orderId      ID заказа
     * @param cancelReason причина отмены заказа
     */
    void cancelOrder(Long orderId, Message cancelReason);
}
