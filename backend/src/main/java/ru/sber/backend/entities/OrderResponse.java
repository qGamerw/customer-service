package ru.sber.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderResponse {
    private long clientId;

    private String clientName;

    private String clientPhoneNumber;

    private BigDecimal totalPrice;

    private Integer totalWeight;

    private String description;

    private String address;

    private Integer flat;

    private Integer floor;

    private Integer frontDoor;

    private List<DishResponse> dishes; //доделать

}
