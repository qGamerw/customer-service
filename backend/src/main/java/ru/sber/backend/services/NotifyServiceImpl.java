package ru.sber.backend.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.Notify;
import ru.sber.backend.repositories.NotifyRepository;


import java.util.List;

/**
 * Реализует логику уведомления о заказах клиента
 */
@Slf4j
@Service
public class NotifyServiceImpl implements NotifyService {
    private final NotifyRepository notifyRepository;
    private final JwtService jwtService;

    @Autowired
    public NotifyServiceImpl(NotifyRepository notifyRepository, JwtService jwtService) {
        this.notifyRepository = notifyRepository;
        this.jwtService = jwtService;
    }

    @Override
    public boolean create(Notify notify) {
        log.info("Создает новое уведомление: {}", notify);
        notifyRepository.save(notify);
        return true;
    }

    @Override
    public boolean delete(long idNotify) {
        log.info("Удаление уведомления с id: {}", idNotify);
        if(notifyRepository.existsById(idNotify)){
            notifyRepository.delete(new Notify(idNotify));
            return true;
        }
        return false;
    }

    @Override
    public List<Notify> findNotifyByClientId() {
        log.info("Удаление уведомления с id: {}", jwtService.getSubClaim(jwtService.getJwtSecurityContext()));
        String subClaim = jwtService.getSubClaim(jwtService.getJwtSecurityContext());
        return notifyRepository.findNotifiesByUser_Id(subClaim);
    }

}
