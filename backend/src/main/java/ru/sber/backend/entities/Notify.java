package ru.sber.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Уведомление пользователя
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notify {
    @Id
    @Column(name = "id_notify")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_id", nullable = false)
    private String user;

    @Column(name = "order_id", nullable = false)
    private long orderId;

    public Notify(long id) {
        this.id = id;
    }

    public Notify(String userId, long orderId) {
        this.user = userId;
        this.orderId = orderId;
    }
}

