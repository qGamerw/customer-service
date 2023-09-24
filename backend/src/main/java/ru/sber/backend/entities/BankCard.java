package ru.sber.backend.entities;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

/**
 * Сущность банковской карты
 */
@Data
@AllArgsConstructor
public class BankCard {
    @NotBlank
    @Size(max = 100)
    private long number;

    @NotBlank
    @Size(max = 100)
    private BigDecimal balance;
}
