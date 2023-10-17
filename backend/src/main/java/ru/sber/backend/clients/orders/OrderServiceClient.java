package ru.sber.backend.clients.orders;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.models.OrderResponse;

import java.util.List;

/**
 * Интерфейс для взаимодействия с сервисом заказов
 */
@FeignClient(value = "feignOrders", url = "http://localhost:8083/orders")
public interface OrderServiceClient {
    /**
     * Получает заказы клиента по ID клиента у сервиса заказов
     *
     * @param clientId ID клиента
     * @return список заказов клиента
     */
    @GetMapping(value = "/client/{clientId}", produces = "application/json")
    List<OrderResponse> getOrdersByClientId(@PathVariable Long clientId);

    /**
     * Создает заказ клиента и передает его сервису заказов
     *
     * @param orderResponse объект заказа
     * @return объект созданного заказа
     */
    @PostMapping(consumes = "application/json", produces = "application/json")
    Long createOrder(@RequestBody OrderResponse orderResponse);

    /**
     * Оплачивает заказ
     *
     * @param orderId ID оплачеваемого заказа
     */
    @PutMapping(value = "/{orderId}/payment", consumes = "application/json")
    void paymentOfOrderById(@PathVariable Long orderId);

    /**
     * Отменяет заказ, обращаясь к сервису заказов
     *
     * @param orderId ID заказа
     * @param cancelReason причина отмены заказа
     */
    @PutMapping(value = "/{orderId}/cancel", consumes = "application/json")
    void cancelOrder(@PathVariable Long orderId, @RequestBody String cancelReason);
}


