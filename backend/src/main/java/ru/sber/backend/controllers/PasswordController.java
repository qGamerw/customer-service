package ru.sber.backend.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.entities.User;
import ru.sber.backend.services.ClientService;
import ru.sber.backend.services.EmailService;

@RestController
public class PasswordController {

    @Autowired
    private ClientService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    /**
     * Отправляет ссылку для сброса пароля на почту пользователя
     *
     * @param email электронная почта пользователя
     * @return статус отправки запроса
     */
    @PostMapping("/forgot")
    public ResponseEntity<Map<String, String>> processForgotPasswordForm(@RequestParam("email") String email) {
        Map<String, String> response = new HashMap<>();

        Optional<User> optional = userService.getClientByEmail(email);

        if (optional.isEmpty()) {
            response.put("error", "Аккаунт с таким email не найден");
        } else {
            User user = optional.get();
            user.setResetToken(UUID.randomUUID().toString());
            userService.signUp(user);

            SimpleMailMessage passwordResetEmail = new SimpleMailMessage();
            passwordResetEmail.setFrom("consumer.service@yandex.ru");
            passwordResetEmail.setTo(user.getEmail());
            passwordResetEmail.setSubject("Сброс пароля аккаунта");
            passwordResetEmail.setText("Ссылка для смены пароля:\n" + "http://localhost:3000"
                    + "/reset?token=" + user.getResetToken());

            emailService.sendEmail(passwordResetEmail);

            response.put("success", "Ссылка была отправлена на почту: " + email);
        }

        return ResponseEntity.ok(response);
    }

    /**
     * Сбрасывает и обновляет пароль пользователя
     *
     * @param token токен для сброса пароля
     * @param request параметры запроса
     * @return статус запроса
     */
    @PostMapping("/reset")
    public ResponseEntity<Map<String, String>> setNewPassword(@RequestParam("token") String token, @RequestBody Map<String, String> request) {
        Map<String, String> response = new HashMap<>();

        String newPassword = request.get("password");

        if (newPassword == null || newPassword.isEmpty()) {
            response.put("errorMessage", "Пароль не может быть пустым.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        Optional<User> user = userService.findUserByResetToken(token);

        if (user.isPresent()) {
            User resetUser = user.get();

            resetUser.setPassword(bCryptPasswordEncoder.encode(newPassword));
            resetUser.setResetToken(null);
            userService.signUp(resetUser);

            response.put("successMessage", "Вы успешно изменили свой пароль");
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            response.put("errorMessage", "Упс! Это неверная ссылка для сброса пароля");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}