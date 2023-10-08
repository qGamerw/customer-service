package ru.sber.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class UserResponse {
    private long id;
    private String username;
    private String number;
    private Date dateOfBirth;

    public UserResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.dateOfBirth = user.getDateOfBirth();
        this.number = user.getNumber();
    }
}
