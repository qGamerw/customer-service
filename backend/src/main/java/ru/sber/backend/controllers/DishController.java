package ru.sber.backend.controllers;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
     * Получает список всех блюд ресторана
     *
     * @return получение списка блюд
     */
    @GetMapping("/any")
    public ResponseEntity<List<Dish>> getDishes() {
        log.info("Получаем меню ресторана");
        List<Dish> listDishes = restaurantServiceClient.getListAllDish();

        return ResponseEntity.ok().body(listDishes);
    }

}