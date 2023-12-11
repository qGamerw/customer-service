package ru.sber.backend.services;

import ru.sber.backend.entities.CartItem;

import java.util.List;

/**
 * Сервис для взаимодействия с корзиной клиента
 */
public interface CartService {
    /**
     * Добавление блюда в корзину
     *
     * @param clientId Уникальный идентификатор пользователя
     * @param dishId   Уникальный идентификатор блюда
     * @return Возвращает статус добавления блюда в корзину
     */
    boolean addToCart(long clientId, long dishId);

    /**
     * Удаление блюда из корзины
     *
     * @param cartId   Уникальный идентификатор корзины
     * @param dishId   Уникальный идентификатор блюда
     * @return Возвращает статус удаления блюда из корзины
     */
    boolean deleteDish(long cartId, long dishId);

    /**
     * Удаляет все блюда из корзины по id клиента
     *
     * @param clientId Уникальный идентификатор клиента
     */
    void deleteAllDish(String clientId);

    /**
     * Изменение количества блюда в корзине
     *
     * @param cartId   Уникальный идентификатор пользователя
     * @param dishId     Уникальный идентификатор блюда
     * @param quantity   Количество добавляемого блюда
     * @return Возвращает статус обновления количества блюда в корзине
     */
    boolean updateDishAmount(long cartId, long dishId, int quantity);

    /**
     * Удаление корзины по ID клиента
     *
     * @param clientId Уникальный идентификатор пользователя
     */
    void deleteCartByClient(String clientId);

    /**
     * Выдает список идентификаторов блюд в корзине пользователя
     *
     * @param cartId Уникальный идентификатор пользователя
     * @return Возвращает список идентификаторов блюд
     */
    List<Long> getListOfDishIdsInCart(long cartId);

    /**
     * Получает список элементов корзины клиента
     *
     * @param cartId id корзины
     * @return список элементов корзины
     */
    List<CartItem> getCartItemsByCartId(long cartId);


}
