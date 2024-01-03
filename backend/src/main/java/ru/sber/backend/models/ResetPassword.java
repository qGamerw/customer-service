package ru.sber.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Данные для сброса пароля
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetPassword {
    private String email;
    private String username;
    private String password;
}
