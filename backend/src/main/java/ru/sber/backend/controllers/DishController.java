package ru.sber.backend.controllers;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.clients.restaurants.RestaurantServiceClient;
import ru.sber.backend.models.Dish;

import java.util.List;

/**
 * Контроллер для получения информации от ресторана
 */
@Slf4j
@RestController
@RequestMapping("/dishes")
public class DishController {

    private final RestaurantServiceClient restaurantServiceClient;

    @Autowired
    public DishController(RestaurantServiceClient restaurantServiceClient) {
        this.restaurantServiceClient = restaurantServiceClient;
    }

    /**
     * Получает необходимую страницу блюд с запрашиваемым размером
     *
     * @return получение страницы блюд
     */
    @GetMapping("/any")
    public ResponseEntity<List<Dish>> getDishes(@RequestParam int page, @RequestParam int size) {
        log.info("Получаем меню ресторана");
        Page<Dish> listDishes = restaurantServiceClient.getListAllDish(page, size);
        log.info("Суммарное кол-во страниц: {}", listDishes.getTotalPages());
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-total-pages", String.valueOf(listDishes.getTotalPages()));
        return ResponseEntity.ok()
                .headers(headers)
                .body(listDishes.getContent());
    }

}
