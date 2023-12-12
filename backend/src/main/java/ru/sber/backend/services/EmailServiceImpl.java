package ru.sber.backend.services;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ru.sber.backend.models.DishOrder;
import ru.sber.backend.models.OrderResponse;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;

    private final JwtService jwtService;

    @Autowired
    public EmailServiceImpl(JavaMailSender mailSender, JwtService jwtService) {
        this.mailSender = mailSender;
        this.jwtService = jwtService;
    }

    @Async
    public void sendEmail(SimpleMailMessage email) {
        mailSender.send(email);
    }

    @Override
    public void sendOrderConfirmation(OrderResponse order) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG);
            helper.setFrom("consumer.service@yandex.ru");

            String email = jwtService.getEmailClaim(jwtService.getJwtSecurityContext());
            helper.setTo(email);

            helper.setSubject("Онлайн чек заказа");
            StringBuilder emailText = new StringBuilder(String.format("Уважаемый %s!\n\n", order.getClientName()));
            emailText.append(String.format("Дата и время оформления заказа: %s\n\n", LocalDateTime.now().format(dateTimeFormatter)));

            for (DishOrder dishOrder : order.getListDishesFromOrder()) {
                emailText.append(String.format("%s - %d шт.\n", dishOrder.getDishName(), dishOrder.getQuantity()));
            }

            emailText.append(String.format("\nСтоимость заказа: %s руб.\n\n", order.getTotalPrice()));
            emailText.append("Спасибо за ваш заказ!");
            helper.setText(emailText.toString());

            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
