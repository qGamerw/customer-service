package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.clients.orders.OrderServiceClient;
import ru.sber.backend.models.OrderResponse;
import ru.sber.backend.services.CartService;
import ru.sber.backend.services.EmailService;

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
    private final EmailService emailService;

    @Autowired
    public OrderController(OrderServiceClient orderServiceClient, CartService cartService, EmailService emailService) {
        this.orderServiceClient = orderServiceClient;
        this.cartService = cartService;
        this.emailService = emailService;
    }

    /**
     * Получает список всех заказов клиента по ID
     *
     * @param clientId ID клиента
     * @return получение списка заказов клиента
     */
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByClientId(@PathVariable Long clientId) {
        log.info("Обращаемся к серверу заказов для получения истории пользователя с id: {}", clientId);
        List<OrderResponse> listOrders = orderServiceClient.getOrdersByClientId(clientId);
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
    public ResponseEntity<Long> createOrder(@RequestBody OrderResponse order) {
        log.info("Создаем заказ клиента {}", order);
        Long idCreatedOrder = orderServiceClient.createOrder(order);
        log.info("Id созданного заказа: {}", idCreatedOrder);

        try {
            emailService.sendOrderConfirmation(order);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        String orderId = order.getClientId();
        log.info("Очищаем корзину пользователся с Id: {}", orderId);
        cartService.deleteAllDish(orderId);
        return ResponseEntity.ok().body(idCreatedOrder);
    }

    /**
     * Оплачивает заказ по его ID
     *
     * @param orderId ID заказа
     * @return статус выполнения операции
     */
    @PutMapping("/{orderId}/payment")
    public ResponseEntity<?> paymentOfOrderById(@PathVariable Long orderId) {
        log.info("Оплачиваем заказ с id {}", orderId);
        orderServiceClient.paymentOfOrderById(orderId);

        return ResponseEntity.accepted().build();
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
