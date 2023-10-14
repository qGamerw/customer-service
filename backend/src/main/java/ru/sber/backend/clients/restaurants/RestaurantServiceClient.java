package ru.sber.backend.clients.restaurants;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import ru.sber.backend.models.Dish;

import java.util.List;

/**
 * Интерфейс для взаимодействия с сервисом ресторана
 */
@FeignClient(value = "feignDishes", url = "http://localhost:8081/dishes")
public interface RestaurantServiceClient {

    @GetMapping(value = "/any", produces = "application/json")
    List<Dish> getListAllDish();

}

