package ru.sber.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

/**
 * Конфигурация для взаимодействия с почтовым сервером
 */
@Configuration
public class EmailConfig {
    @Bean
    public JavaMailSender javaMailSender() {
        String host = "smtp.yandex.ru";

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(465);
        mailSender.setUsername("consumer.service@yandex.ru");
        mailSender.setPassword("klefitnyevoakgqp");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.host", host);
        props.put("mail.transport.protocol", "smtps");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}

