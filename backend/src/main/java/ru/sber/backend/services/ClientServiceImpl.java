package ru.sber.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.sber.backend.entities.User;
import ru.sber.backend.repositories.ClientRepository;

import java.util.Optional;

/**
 * Сервис для взаимодействия с пользователем
 */
@Service
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;
    private final CartService cartService;

    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository, CartService cartService) {
        this.clientRepository = clientRepository;
        this.cartService = cartService;
    }

    @Override
    public long signUp(User client) {
        return clientRepository.save(client).getId();
    }

    @Override
    public Optional<User> getClientById(long clientId) {
        return clientRepository.findById(clientId);
    }

    @Override
    public boolean checkClientExistence(long clientId) {
        return clientRepository.existsById(clientId);
    }

    @Override
    @Transactional
    public boolean deleteClientById(long clientId) {
        if (checkClientExistence(clientId)) {
            cartService.clearCart(clientId);
            clientRepository.deleteById(clientId);
            return true;
        }
        return false;
    }

    @Override
    public Optional<User> findByLoginAndPassword(String email, String password) {
        return clientRepository.findUserByEmailAndPassword(email, password);
    }
}
