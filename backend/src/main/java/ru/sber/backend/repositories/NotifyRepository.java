package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.Notify;

import java.util.List;

@Repository
public interface NotifyRepository extends JpaRepository<Notify, Long> {

    List<Notify> findNotifiesByUser_Id(long id);
}
