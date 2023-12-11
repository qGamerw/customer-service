package ru.sber.backend.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.sber.backend.entities.User;
import ru.sber.backend.repositories.ClientRepository;

import java.util.Date;
import java.util.Optional;

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
    public String signUp(User client) {
        return clientRepository.save(client).getId();
    }

    @Override
    public Optional<User> getClientById(String clientId) {

        return clientRepository.findById(clientId);
    }

    @Override
    public boolean checkClientExistence(String clientId) {

        return clientRepository.existsById(clientId);
    }

    @Override
    @Transactional
    public boolean deleteClientById(String clientId) {
        if (checkClientExistence(clientId)) {
            cartService.deleteCartByClient(clientId);
            clientRepository.deleteById(clientId);

            return true;
        }
        return false;
    }

    @Override
    public Optional<User> getClientByEmail(String email) {
        return Optional.empty();
    }


    @Override
    public boolean updateClientInfo(String clientId, String name, Date dateOfBirth, String number) {
        Optional<User> optionalUser = clientRepository.findById(clientId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            user.setDateOfBirth(dateOfBirth);
            clientRepository.save(user);

            return true;
        } else {
            throw new EntityNotFoundException("Клиент с id " + clientId + " не найден");
        }
    }

    @Override
    public Optional<User> findUserByResetToken(String resetToken) {

        return clientRepository.findByResetToken(resetToken);
    }
}
