package ru.sber.backend.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class DishFromCart extends Dish {
    private int quantity;
}
