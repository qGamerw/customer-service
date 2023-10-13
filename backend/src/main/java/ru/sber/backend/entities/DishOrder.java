package ru.sber.backend.entities;


import lombok.Data;

@Data
public class DishOrder {

    private Long dishId;

    private String dishName;

    private int quantity;

}