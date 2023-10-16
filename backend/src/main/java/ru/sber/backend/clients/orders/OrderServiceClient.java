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

    @GetMapping(value = "/client/{clientId}", produces = "application/json")
    List<OrderResponse> getOrdersByClientId(@PathVariable Long clientId);

    @PostMapping(consumes = "application/json", produces = "application/json")
    Long createOrder(@RequestBody OrderResponse orderResponse);

    @PutMapping(value = "/{orderId}/payment", consumes = "application/json")
    void paymentOfOrderById(@PathVariable Long orderId);

    @PutMapping(value = "/{orderId}/cancel", consumes = "application/json")
    void cancelOrder(@PathVariable Long orderId, @RequestBody String cancelReason);
}


