package ru.sber.backend.proxies;

import org.springframework.stereotype.Component;
import ru.sber.backend.exceptions.PaymentException;
import ru.sber.backend.entities.BankCard;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Прокси банковского приложения
 */
@Component
public class BankAppProxy implements BankAppInterfaceProxy {

    List<BankCard> cards = new ArrayList<>(List.of(
            new BankCard(999999, BigDecimal.valueOf(30000)),
            new BankCard(123444, BigDecimal.valueOf(700)),
            new BankCard(143456, BigDecimal.valueOf(10500))
    ));

    @Override
    public BigDecimal getBalance(long cardNumber) {
        for (var card : cards) {
            if (card.getNumber() == cardNumber) {
                return card.getBalance();
            }
        }
        throw new PaymentException("Номер картый не найден");
    }

    @Override
    public void setBalance(long numberCard, BigDecimal newBalance) {
        for(var card : cards) {
            if (card.getNumber() == numberCard) {
                card.setBalance(newBalance);
                break;
            }
        }
    }

    @Override
    public void addClient(BankCard bankCard) {
        cards.add(bankCard);
    }
}