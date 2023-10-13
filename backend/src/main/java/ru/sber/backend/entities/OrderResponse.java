package ru.sber.backend.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime orderTime;

    private BigDecimal totalPrice;

    private Integer totalWeight;

    private String description;

    private String address;

    private Integer flat;

    private Integer floor;

    private Integer frontDoor;

    private String status;

    private List<DishOrder> listDishesFromOrder;

}
