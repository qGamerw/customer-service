package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.services.ClientService;


@Slf4j
@RestController
@RequestMapping("client")
public class ClientController {
    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    /**
     * Удаляет пользователя по идентификатору
     *
     * @param clientId Уникальный идентификатор клиента
     * @return Возвращает статус выполнения
     */
    @DeleteMapping("/{clientId}")
    public ResponseEntity<?> deleteClient(@PathVariable long clientId) {

        log.info("Удаляем клиента с id: {}", clientId);

        boolean isDeleted = clientService.deleteClientById(clientId);

        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
