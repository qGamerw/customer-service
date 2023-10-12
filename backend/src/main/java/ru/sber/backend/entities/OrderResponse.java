package ru.sber.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderResponse {
    private long clientId;

    private long branchOfficeId;

    private String clientName;

    private String description;

    private int clientPhoneNumber;

    private String address;

    private String branchAddress;

    private Integer flat;

    private Integer frontDoor;

    private Integer floor;

    private String statusOrders;

    private LocalDateTime orderTime;

    private List<CartItem> dishes;

    private BigDecimal price;
}
