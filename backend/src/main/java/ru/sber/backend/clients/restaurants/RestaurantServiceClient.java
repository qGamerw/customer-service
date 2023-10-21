package ru.sber.backend.clients.restaurants;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.sber.backend.models.Dish;


/**
 * Интерфейс для взаимодействия с сервисом ресторана
 */
@FeignClient(value = "feignDishes", url = "http://localhost:8081/dishes")
public interface RestaurantServiceClient {
    /**
     * Получает необходимую страницу блюд с запрашиваемым размером
     *
     * @return получение страницы блюд
     */
    @GetMapping(value = "/any", produces = "application/json")
    Page<Dish> getListAllDish(@RequestParam int page, @RequestParam int size);
}
