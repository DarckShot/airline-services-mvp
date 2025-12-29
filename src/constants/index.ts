export const STORAGE_KEYS = {
  CART: 'airline-services-cart',
} as const;

export const MESSAGES = {
  ORDER_CONFIRMED: 'Заказ оформлен!',
  SERVICES_LABEL: 'Услуги:',
  TOTAL_LABEL: 'Итого:',
  EMPTY_CART: 'Услуги не выбраны',
  EMPTY_CART_HINT: 'Выберите услуги из списка выше',
  STORAGE_READ_ERROR: 'Ошибка при чтении корзины из localStorage',
  STORAGE_WRITE_ERROR: 'Ошибка при сохранении корзины в localStorage',
} as const;

export const BUTTON_LABELS = {
  ADD: 'Добавить',
  ADDED: 'Добавлено',
  CHECKOUT: 'Оформить заказ',
} as const;
