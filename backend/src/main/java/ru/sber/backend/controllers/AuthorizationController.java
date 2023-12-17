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
import ru.sber.backend.entities.request.LoginRequest;
import ru.sber.backend.entities.request.SignupRequest;
import ru.sber.backend.models.*;
import ru.sber.backend.services.JwtService;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthorizationController {

    private final String keycloakTokenUrl = "http://localhost:8080/realms/customer-realm/protocol/openid-connect/token";
    private final String keycloakCreateUserUrl = "http://localhost:8080/admin/realms/customer-realm/users";
    private final String keycloakUpdateUserUrl = "http://localhost:8080/admin/realms/customer-realm/users/";
    private final String clientId = "login-app";
    private final String grantType = "password";
    private final JwtService jwtService;


    @Autowired
    public AuthorizationController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PreAuthorize("hasRole('client_user')")
    @PutMapping
    public ResponseEntity<?> updateUserInfo(@RequestBody SignupRequest signupRequest) throws JsonProcessingException {
        log.info("Выводим новые данные о клиенте {}", signupRequest);
        Jwt jwt = jwtService.getJwtSecurityContext();
        UserRequest userRequest = new UserRequest();
        userRequest.setUsername(jwtService.getPreferredUsernameClaim(jwt));
        userRequest.setEmail(signupRequest.getEmail());
        userRequest.setEnabled(true);

        Attributes attributes = new Attributes();
        attributes.setPhoneNumber(signupRequest.getNumber());
        attributes.setDateBirthday(jwtService.getDateBirthdayClaim(jwt));
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
                    keycloakUpdateUserUrl+jwtService.getSubClaim(jwtService.getJwtSecurityContext()),
                    HttpMethod.PUT, userEntity, String.class);
            log.info("Результат отправки на keycloak: {}", userResponseEntity.getStatusCode());

            return new ResponseEntity<>(userResponseEntity.getStatusCode());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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
        attributes.setDateBirthday(signupRequest.getDateOfBirth().toString());
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

            return new ResponseEntity<>(userResponseEntity.getStatusCode());
        } catch (Exception e) {
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

    @PreAuthorize("hasRole('client_user')")
    @GetMapping
    public ResponseEntity<UserResponse> getUserDetails() {
        HttpHeaders userHeaders = new HttpHeaders();
        userHeaders.setContentType(MediaType.APPLICATION_JSON);

        Jwt jwt = jwtService.getJwtSecurityContext();
        UserResponse userDetails = new UserResponse(
                jwtService.getSubClaim(jwt), jwtService.getPreferredUsernameClaim(jwt),
                jwtService.getEmailClaim(jwt), jwtService.getPhoneNumberClaim(jwt),
                jwtService.getDateBirthdayClaim(jwt)
        );

        return new ResponseEntity<>(userDetails, userHeaders, HttpStatus.OK);
    }
}
