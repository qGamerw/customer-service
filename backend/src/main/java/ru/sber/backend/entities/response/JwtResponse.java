package ru.sber.backend.entities.response;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class JwtResponse {
    private String accessToken;

    private String type = "Bearer";

    private Long id;

    private String username;

    private String email;

    private String number;

    private Date dateOfBirth;

    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String email, String number, Date dateOfBirth, List<String> roles) {
        this.accessToken = accessToken;

        this.id = id;

        this.username = username;

        this.email = email;

        this.number = number;

        this.dateOfBirth = dateOfBirth;

        this.roles = roles;
    }
}
