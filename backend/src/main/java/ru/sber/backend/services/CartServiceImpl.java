package ru.sber.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.Cart;
import ru.sber.backend.entities.User;
import ru.sber.backend.repositories.CartRepository;
import ru.sber.backend.repositories.ClientRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {
    CartRepository cartRepository;
    ClientRepository clientRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, ClientRepository clientRepository) {
        this.cartRepository = cartRepository;
        this.clientRepository = clientRepository;
    }

    @Override
    public boolean addToCart(long dishId, long clientId) {
        Optional<Cart> cart = cartRepository.findCartByClient_IdAndDishIdsContains(dishId, clientId);

        Cart shoppingCart = cart.orElseGet(() -> {
            Optional<User> user = clientRepository.findById(clientId);
            if (user.isPresent()) {
                Cart newCart = new Cart();
                newCart.setClient(user.get());
                newCart.setQuantity(0);
                newCart.setDishIds(new ArrayList<>());
                return newCart;
            }

            return null;
        });

        if (shoppingCart != null) {
            shoppingCart.getDishIds().add(dishId);
            cartRepository.save(shoppingCart);
            return true;
        }

        return false;
    }

    @Override
    public boolean deleteDish(long dishId, long clientId) {
        Optional<Cart> cart = cartRepository.findCartByClient_IdAndDishIdsContains(dishId, clientId);
        if (cart.isPresent()) {
            Cart shoppingCart = cart.get();
            List<Long> dishIds = shoppingCart.getDishIds();
            if (dishIds.remove(dishId)) {
                cartRepository.save(shoppingCart);
                return true;
            }
        }

        return false;
    }

    @Override
    public boolean updateDishAmount(long clientId, long dishId, int amount) {
        Optional<Cart> cart = cartRepository.findCartByClient_IdAndDishIdsContains(dishId, clientId);
        if (cart.isPresent()) {
            Cart shoppingCart = cart.get();
            shoppingCart.setQuantity(amount);
            cartRepository.save(shoppingCart);
            return true;
        }
        return false;
    }

    @Override
    public void clearCart(long clientId) {
        cartRepository.deleteCartByClientId(clientId);
    }

    @Override
    public List<Long> getListOfDishIdsInCart(long clientId) {
        Optional<Cart> cart = cartRepository.findCartByClient_Id(clientId);

        if (cart.isPresent()) {
            Cart shoppingCart = cart.get();

            return shoppingCart.getDishIds();
        }
        else {
            return Collections.emptyList();
        }
    }

    @Override
    public int countDishesInCart(long clientId) {
        return cartRepository.countCartsByClient_Id(clientId);
    }
}
