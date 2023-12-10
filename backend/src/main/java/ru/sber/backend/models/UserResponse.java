package ru.sber.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.sber.backend.entities.User;

import java.util.Date;

/**
 * Клиент с ограниченной информацией
 */
@Data
@AllArgsConstructor
public class UserResponse {
    private String id;
    private String username;
    private String number;
    private Date dateOfBirth;

    public UserResponse(User user) {
        this.id = user.getId();
        this.dateOfBirth = user.getDateOfBirth();
    }
}
