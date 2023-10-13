package ru.sber.backend.clients.orders;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.models.OrderResponse;

import java.util.List;

@FeignClient(value = "feignOrders", url = "http://localhost:8083/orders")
public interface OrderServiceClient {

    @GetMapping(value = "/client/{clientId}", produces = "application/json")
    List<?> getOrdersByClientId(@PathVariable Long clientId);

    @PostMapping(consumes = "application/json", produces = "application/json")
    OrderResponse createOrder(@RequestBody OrderResponse orderResponse);
}


