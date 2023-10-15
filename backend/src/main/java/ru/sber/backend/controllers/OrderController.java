package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.clients.orders.OrderServiceClient;
import ru.sber.backend.models.OrderResponse;
import ru.sber.backend.services.CartService;

import java.util.List;

/**
 * Контроллер для обработки запросов к заказу клиента
 */
@Slf4j
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderServiceClient orderServiceClient;
    private final CartService cartService;

    @Autowired
    public OrderController(OrderServiceClient orderServiceClient, CartService cartService) {
        this.orderServiceClient = orderServiceClient;
        this.cartService = cartService;
    }

    /**
     * Получает список всех заказов клиента по ID
     *
     * @param clientId ID клиента
     * @return получение списка заказов клиента
     */
    @GetMapping("/client/{clientId}")
    public ResponseEntity<?> getOrdersByClientId(@PathVariable Long clientId) {
        log.info("Обращаемся к серверу заказов для получения истории пользователя с id: {}", clientId);
        List<?> listOrders = orderServiceClient.getOrdersByClientId(clientId);
        log.info("Выводим историю пользователя с id: {} История: {}", clientId, listOrders);
        return ResponseEntity.ok().body(listOrders);
    }

    /**
     * Создает заказ
     *
     * @param order заказ клиента
     * @return статус запроса
     */
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderResponse order) {
        log.info("Создает заказ клиента {}", order);
        OrderResponse createdOrder = orderServiceClient.createOrder(order);
        long clientId = order.getClientId();
        cartService.deleteAllDish(clientId);

        return ResponseEntity.ok().body(createdOrder);
    }

    /**
     * Отменяет заказ по его ID
     *
     * @param orderId      ID заказа, который нужно отменить
     * @param cancelReason Причина отмены заказа
     * @return статус выполнения операции
     */
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId, @RequestBody String cancelReason) {
        log.info("Отменяет заказ с id: {}", orderId);

        orderServiceClient.cancelOrder(orderId, cancelReason);

        return ResponseEntity.accepted().build();
    }

}
