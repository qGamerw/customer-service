package ru.sber.backend.services;

import org.springframework.stereotype.Service;
import ru.sber.backend.entities.Payment;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Override
    public boolean pay(Payment payment) {
        return false;
    }
}
