package ru.sber.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

/**
 * Блюдо
 */

@AllArgsConstructor
@Data
public class Dish {

    private Long id;

    private String name;

    private String description;

    private String urlImage;

    private Category category;

    private BigDecimal price;

    private double weight;

}
