package ru.sber.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Категория блюда
 */
@Data
@AllArgsConstructor
public class Category {

    private long id;

    private String category;

}
