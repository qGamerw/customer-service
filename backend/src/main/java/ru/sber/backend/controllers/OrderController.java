package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.clients.orders.OrderServiceClient;
import ru.sber.backend.entities.OrderResponse;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/orders ")
public class OrderController {

    private final OrderServiceClient orderServiceClient;

    @Autowired
    public OrderController(OrderServiceClient orderServiceClient) {
        this.orderServiceClient = orderServiceClient;
    }

    /**
     * Получает список всех заказов клиента по ID
     *
     * @param clientId ID клиента
     * @return получение списка заказов клиента
     */
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<?>> getOrdersByClientId(@PathVariable Long clientId) {
        List<?> listOrders = orderServiceClient.getOrdersByClientId(clientId);

        return ResponseEntity.ok().body(listOrders);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderResponse order) {
        OrderResponse createdOrder = orderServiceClient.createOrder(order);

        return ResponseEntity.ok().body(createdOrder);
    }
}
