package ru.sber.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

/**
 * Клиент с ограниченной информацией
 */
@Data
@AllArgsConstructor
public class UserResponse {
    private String id;
    private String username;
    private String email;
    private String number;
    private LocalDate dateOfBirth;

    public UserResponse(String id, String username, String email, String number, String dateOfBirth) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.number = number;
        this.dateOfBirth = LocalDate.parse(dateOfBirth);
    }
}
