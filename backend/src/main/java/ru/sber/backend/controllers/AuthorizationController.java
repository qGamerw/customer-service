package ru.sber.backend.controllers;

import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import ru.sber.backend.entities.request.LoginRequest;
import ru.sber.backend.services.ClientService;
import ru.sber.backend.services.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthorizationController {

    private final String keycloakTokenUrl = "http://localhost:8080/realms/customer-realm/protocol/openid-connect/token";
    private final String keycloakCreateUserUrl = "http://localhost:8080/admin/realms/customer-realm/users";
    private final String clientId = "login-app";
    private final String grantType = "password";

    private final ClientService clientService;
    private final JwtService jwtService;

    public AuthorizationController(ClientService clientService, JwtService jwtService) {
        this.clientService = clientService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signin")
    public ResponseEntity<String> signInUser(@RequestBody LoginRequest loginRequest) {
        HttpHeaders tokenHeaders = new HttpHeaders();
        tokenHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> tokenBody = new LinkedMultiValueMap<>();
        tokenBody.add("grant_type", grantType);
        tokenBody.add("client_id", clientId);
        tokenBody.add("username", loginRequest.getUsername());
        tokenBody.add("password", loginRequest.getPassword());

        HttpEntity<MultiValueMap<String, String>> tokenEntity = new HttpEntity<>(tokenBody, tokenHeaders);

        try {
            ResponseEntity<String> tokenResponseEntity = new RestTemplate().exchange(
                    keycloakTokenUrl, HttpMethod.POST, tokenEntity, String.class);

            return new ResponseEntity<>(tokenResponseEntity.getBody(),
                    tokenResponseEntity.getStatusCode());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
