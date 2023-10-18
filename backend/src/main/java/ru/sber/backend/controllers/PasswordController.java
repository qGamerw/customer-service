package ru.sber.backend.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.entities.User;
import ru.sber.backend.services.ClientService;
import ru.sber.backend.services.EmailService;

/**
 * Контроллер для сброса и изменения пароля аккаунта клиента
 */
@Slf4j
@RestController
public class PasswordController {
    private final ClientService userService;
    private final EmailService emailService;
    private final PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public PasswordController(ClientService userService, EmailService emailService, PasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.emailService = emailService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    /**
     * Отправляет ссылку для сброса пароля на почту пользователя
     *
     * @return статус отправки запроса
     */
    @PostMapping("/forgot")
    public ResponseEntity<Map<String, String>> processForgotPasswordForm(@RequestBody Map<String, String> request) {
        Map<String, String> response = new HashMap<>();

        String email = request.get("email");

        Optional<User> optional = userService.getClientByEmail(email);

        if (optional.isEmpty()) {
            response.put("error", "Аккаунт с таким email не найден");

            log.info("Аккаунт с таким email не найден");

            return ResponseEntity.badRequest().body(response);
        } else {
            User user = optional.get();
            user.setResetToken(UUID.randomUUID().toString());
            userService.signUp(user);

            SimpleMailMessage passwordResetEmail = new SimpleMailMessage();
            passwordResetEmail.setFrom("consumer.service@yandex.ru");
            passwordResetEmail.setTo(user.getEmail());
            passwordResetEmail.setSubject("Сброс пароля аккаунта");
            passwordResetEmail.setText("Здравствуйте, " + user.getUsername() + "! \nСсылка для смены пароля:\n" + "http://localhost:3000"
                    + "/reset?token=" + user.getResetToken());

            emailService.sendEmail(passwordResetEmail);

            response.put("success", "Ссылка была отправлена на почту: " + email);
            response.put("token", user.getResetToken());

            return ResponseEntity.ok(response);
        }
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
            return ResponseEntity.badRequest().body(response);
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

            return ResponseEntity.badRequest().body(response);
        }
    }
}
