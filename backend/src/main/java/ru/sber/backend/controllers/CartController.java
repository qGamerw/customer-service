package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.entities.CartItem;
import ru.sber.backend.services.CartService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    /**
     * Получает список блюд по id корзины
     *
     * @param cartId id корзины
     * @return получение списка блюд
     */
    @GetMapping("/{cartId}")
    public ResponseEntity<List<CartItem>> getDishes(@PathVariable long cartId) {
        log.info("Получаем список блюд в корзине c id: {}", cartId);
        List<CartItem> cartItems = cartService.getCartItemsByCartId(cartId);

        return ResponseEntity.ok().body(cartItems);
    }

    /**
     * Добавляет блюдо в корзину
     *
     * @param cartId   id корзины
     * @param dishId   id блюда
     * @return корзину с добавленными блюдами
     */
    @PostMapping("/{cartId}/dish/{dishId}")
    public ResponseEntity<String> addProductToCart(@PathVariable long cartId, @PathVariable Long dishId) {
        log.info("Добавление в корзину блюда с id: {}", dishId);
        boolean recordInserted = cartService.addToCart(cartId, dishId);
        if (recordInserted) {
            return ResponseEntity.ok("Блюдо успешно добавлено в корзину");
        } else {
            return ResponseEntity.badRequest().body("Не удалось добавить блюдо в корзину");
        }
    }

    /**
     * Обновляет количество блюда в корзине
     *
     * @param cartId id корзины
     * @param dishId id блюда
     * @param dish   блюда, у которого изменяется количество
     * @return корзину с измененным количеством блюда
     */
    @PutMapping("/{cartId}/dish/{dishId}")
    public ResponseEntity<String> updateCartItemQuantity(@PathVariable long cartId, @PathVariable long dishId, @RequestBody CartItem dish) {
        log.info("Изменяется количество товара в корзине c id: {}", cartId);
        boolean recordUpdated = cartService.updateDishAmount(cartId, dishId, dish.getQuantity());

        if (recordUpdated) {
            return ResponseEntity.ok("Количество блюд изменено");
        } else {
            return ResponseEntity.badRequest().body("Не удалось изменить блюдо");
        }
    }

    /**
     * Удаляет блюдо из корзины
     *
     * @param cartId id корзины
     * @param dishId id блюда
     * @return корзина с внесенными изменениями
     */
    @DeleteMapping("/{cartId}/dish/{dishId}")
    public ResponseEntity<String> deleteDish(@PathVariable long cartId, @PathVariable long dishId) {

        log.info("Удаление из {} корзины блюда с id: {}", cartId,dishId);

        boolean isDeleted = cartService.deleteDish(cartId, dishId);

        if (isDeleted) {
            return ResponseEntity.ok("Блюдо удалено из корзины");
        } else {
            return ResponseEntity.badRequest().body("Не удалось удалить блюдо");
        }
    }
}
