package ru.sber.backend.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Сущность клиента ресторана
 */
@Data
@Table(name = "clients")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Size(max = 100)
    @Column(nullable = false)
    private String username;

    @Size(max = 100)
    private String number;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateOfBirth;

    @Size(max = 100)
    @Column(nullable = false, unique = true)
    @Email
    private String email;

    @Size(max = 100)
    @Column(nullable = false)
    private String password;

    @Column
    private String resetToken;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(String username, String email, String number, Date dateOfBirth, String password) {
        this.username = username;
        this.number = number;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
    }

    public User(String email) {
        this.email = email;
    }
}
