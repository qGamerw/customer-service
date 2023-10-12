package ru.sber.backend.clients.orders;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ru.sber.backend.entities.OrderResponse;

import java.util.List;

@FeignClient(value = "feignOrders", url = "http://localhost:8081/orders")
public interface OrderServiceClient {

    @RequestMapping(method = RequestMethod.GET, value = "/any", produces = "application/json")
    List<?> getOrdersByClientId(Long clientId);

    @RequestMapping(method = RequestMethod.POST, value = "/create", consumes = "application/json", produces = "application/json")
    OrderResponse createOrder(@RequestBody OrderResponse orderResponse);
}


