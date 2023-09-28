package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.sber.backend.entities.User;
import ru.sber.backend.services.ClientService;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("client")
public class ClientController {
    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public ResponseEntity<?> getClientInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            Optional<User> client = clientService.getClientByEmail(email);
            if (client.isPresent()) {
                return ResponseEntity.ok(client.get());
            }
        }
        return ResponseEntity.badRequest().body("Ошибка при получении информации о клиенте");
    }

    @DeleteMapping
    public ResponseEntity<?> deleteClient() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            Optional<User> client = clientService.getClientByEmail(email);
            if (client.isPresent()) {
                long clientId = client.get().getId();
                boolean deleted = clientService.deleteClientById(clientId);
                if (deleted) {
                    return ResponseEntity.ok("Клиент успешно удален");
                }
            }
        }
        return ResponseEntity.badRequest().body("Ошибка при удалении клиента");
    }
}
