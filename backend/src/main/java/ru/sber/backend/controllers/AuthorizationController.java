package ru.sber.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import ru.sber.backend.config.JwtTokenContext;
import ru.sber.backend.entities.User;
import ru.sber.backend.entities.request.LoginRequest;
import ru.sber.backend.entities.request.SignupRequest;
import ru.sber.backend.models.*;
import ru.sber.backend.services.ClientService;
import ru.sber.backend.services.JwtService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthorizationController {

    private final String keycloakTokenUrl = "http://localhost:8080/realms/customer-realm/protocol/openid-connect/token";
    private final String keycloakCreateUserUrl = "http://localhost:8080/admin/realms/customer-realm/users";
    private final String clientId = "login-app";
    private final String grantType = "password";

    private final ClientService clientService;
    private final JwtService jwtService;
    private final JwtTokenContext jwtTokenContext;

    @Autowired
    public AuthorizationController(ClientService clientService, JwtService jwtService, JwtTokenContext jwtTokenContext) {
        this.clientService = clientService;
        this.jwtService = jwtService;
        this.jwtTokenContext = jwtTokenContext;
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

    @Transactional
    @PostMapping("/signup")
    public ResponseEntity<String> signUpUser(@RequestBody SignupRequest signupRequest) throws JsonProcessingException {
        log.info("Выводим данные о клиенте {}", signupRequest);
        UserRequest userRequest = new UserRequest();
        userRequest.setUsername(signupRequest.getUsername());
        userRequest.setEmail(signupRequest.getEmail());
        userRequest.setEnabled(true);

        Attributes attributes = new Attributes();
        attributes.setPhoneNumber(signupRequest.getNumber()
        );
        userRequest.setAttributes(attributes);

        Credential credential = new Credential();
        credential.setType(grantType);
        credential.setValue(signupRequest.getPassword());

        List<Credential> credentials = new ArrayList<>();
        credentials.add(credential);
        userRequest.setCredentials(credentials);

        HttpHeaders userHeaders = new HttpHeaders();
        userHeaders.setContentType(MediaType.APPLICATION_JSON);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(signInUser(new LoginRequest("admin", "11111")).getBody());
        String accessToken = rootNode.path("access_token").asText();
        userHeaders.setBearerAuth(accessToken);
        HttpEntity<UserRequest> userEntity = new HttpEntity<>(userRequest, userHeaders);

        log.info("Http entity: {}", userEntity);
        try {
            ResponseEntity<String> userResponseEntity = new RestTemplate().exchange(
                    keycloakCreateUserUrl, HttpMethod.POST, userEntity, String.class);
            log.info("Результат отправки на keycloak: {}", userResponseEntity.getStatusCode());
            String responseHeader = userResponseEntity.getHeaders().get("Location").get(0);

            int lastSlashIndex = responseHeader.lastIndexOf("/");
            String userId = responseHeader.substring(lastSlashIndex + 1);
            User user = new User(userId, signupRequest.getDateOfBirth());

            clientService.signUp(user);

            return new ResponseEntity<>(userResponseEntity.getStatusCode());
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> refreshUser(@RequestBody RefreshToken refreshToken) {
        HttpHeaders tokenHeaders = new HttpHeaders();
        tokenHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> tokenBody = new LinkedMultiValueMap<>();
        tokenBody.add("grant_type", "refresh_token");
        tokenBody.add("client_id", clientId);
        tokenBody.add("refresh_token", refreshToken.getRefresh_token());

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

    @GetMapping
    public ResponseEntity<String> getUserDetails() {
        HttpHeaders userHeaders = new HttpHeaders();
        userHeaders.setContentType(MediaType.APPLICATION_JSON);

        Jwt jwt = jwtTokenContext.getJwtSecurityContext();
        UserResponse userDetails = new UserResponse(jwtService.getPreferredUsernameClaim(jwt),
                jwtService.getEmailClaim(jwt), jwtService.getPhoneNumberClaim(jwt));


        ObjectMapper objectMapper = new ObjectMapper();
        String userDetailsJson;
        try {
            userDetailsJson = objectMapper.writeValueAsString(userDetails);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("Error processing user details", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(userDetailsJson, userHeaders, HttpStatus.OK);
    }
}
