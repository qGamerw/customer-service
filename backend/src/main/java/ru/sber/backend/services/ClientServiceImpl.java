package ru.sber.backend.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
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
    private final JwtService jwtService;

    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository, CartService cartService, JwtService jwtService) {
        this.clientRepository = clientRepository;
        this.cartService = cartService;
        this.jwtService = jwtService;
    }


    @Override
    public String signUp(User client) {
        return clientRepository.save(client).getId();
    }

    @Override
    public Optional<User> getClientById() {

        return clientRepository.findById(getIdClient());
    }

    @Override
    public boolean checkClientExistence() {

        return clientRepository.existsById(getIdClient());
    }

    @Override
    @Transactional
    public boolean deleteClientById() {
        if (checkClientExistence()) {
            cartService.deleteCart();
            clientRepository.deleteById(getIdClient());

            return true;
        }
        return false;
    }

    @Override
    public Optional<User> findUserByResetToken(String resetToken) {

        return clientRepository.findByResetToken(resetToken);
    }

    private String getIdClient() {
        Jwt jwt = jwtService.getJwtSecurityContext();
        return jwtService.getSubClaim(jwt);
    }
}
