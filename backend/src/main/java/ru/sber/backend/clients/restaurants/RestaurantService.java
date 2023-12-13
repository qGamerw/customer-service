package ru.sber.backend.clients.restaurants;

import org.springframework.data.domain.Page;
import ru.sber.backend.models.Dish;
import ru.sber.backend.models.DishFromCart;

import java.util.List;

public interface RestaurantService {

    Page<Dish> getListAllDish(int page, int size);

    List<DishFromCart> getListDishesById(String list);
}
