package ru.sber.backend.services;
import org.springframework.mail.SimpleMailMessage;

/**
 * Сервис отправки письма на электронную почту
 */
public interface EmailService {
    /**
     * Отпрвляет письмо на указанную электронную почту
     *
     * @param email электронная почта клиента
     */
    void sendEmail(SimpleMailMessage email);
}
