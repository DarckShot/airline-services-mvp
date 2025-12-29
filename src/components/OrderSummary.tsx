import type { SelectedService } from '../types';
import styles from './OrderSummary.module.css';

interface OrderSummaryProps {
  selectedServices: SelectedService[];
  onRemove: (serviceId: string) => void;
  onCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedServices,
  onRemove,
  onCheckout,
}) => {
  const totalAmount = selectedServices.reduce(
    (sum, service) => sum + service.price * service.quantity,
    0
  );

  if (selectedServices.length === 0) {
    return (
      <div className={`${styles.summary} ${styles.empty}`}>
        <h2 className={styles.title}>Итого</h2>
        <p className={styles.emptyMessage}>Услуги не выбраны</p>
        <p className={styles.emptyHint}>Выберите услуги из списка выше</p>
      </div>
    );
  }

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Итого</h2>
      <div className={styles.servicesList}>
        {selectedServices.map((service) => (
          <div key={service.id} className={styles.serviceItem}>
            <div className={styles.serviceInfo}>
              <span className={styles.serviceName}>
                {service.icon && <span className={styles.iconSmall}>{service.icon}</span>}
                {service.name}
              </span>
              {service.quantity > 1 && (
                <span className={styles.quantity}>× {service.quantity}</span>
              )}
            </div>
            <div className={styles.serviceActions}>
              <span className={styles.servicePrice}>
                {(service.price * service.quantity).toLocaleString('ru-RU')} ₽
              </span>
              <button
                className={styles.removeButton}
                onClick={() => onRemove(service.id)}
                aria-label="Удалить услугу"
                title="Удалить услугу"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        <span className={styles.totalLabel}>Всего:</span>
        <span className={styles.totalAmount}>{totalAmount.toLocaleString('ru-RU')} ₽</span>
      </div>
      <button className={styles.checkoutButton} onClick={onCheckout}>
        Оформить заказ
      </button>
    </div>
  );
};

export default OrderSummary;
