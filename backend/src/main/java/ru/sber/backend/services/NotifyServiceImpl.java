package ru.sber.backend.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.Notify;
import ru.sber.backend.exceptions.UserNotFound;
import ru.sber.backend.repositories.NotifyRepository;
import ru.sber.backend.security.services.UserDetailsImpl;

import java.util.List;

/**
 * Реализует логику уведомления о заказах клиента
 */
@Slf4j
@Service
public class NotifyServiceImpl implements NotifyService {
    private final NotifyRepository notifyRepository;
    @Autowired
    public NotifyServiceImpl(NotifyRepository notifyRepository) {
        this.notifyRepository = notifyRepository;
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
        log.info("Удаление уведомления с id: {}", getUserIdSecurityContext());
        return notifyRepository.findNotifiesByUser_Id(getUserIdSecurityContext());
    }

    /**
     * Получает id user из security context
     *
     * @return идентификатор пользователя
     */
    private long getUserIdSecurityContext() {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            return ((UserDetailsImpl) principal).getId();
        } else {
            throw new UserNotFound("Пользователь не найден");
        }
    }
}
