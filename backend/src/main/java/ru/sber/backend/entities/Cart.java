package ru.sber.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Сущность корзины клиента
 */
@Data
@Table(name = "carts")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private User client;

    @NotBlank
    @Size(max = 100)
    private int quantity;

    @ElementCollection
    @CollectionTable(name = "cart_dishes", joinColumns = @JoinColumn(name = "cart_id"))
    @Column(name = "dish_id")
    private List<Long> dishIds;
}
