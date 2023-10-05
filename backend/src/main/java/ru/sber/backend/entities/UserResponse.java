package ru.sber.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class UserResponse {
    private long id;
    private String name;
    private String number;
    private Date dateOfBirth;

    public UserResponse(User user) {
        this.id = user.getId();
        this.name = user.getUsername();
        this.number = user.getNumber();
        this.dateOfBirth = user.getDateOfBirth();
    }
}
