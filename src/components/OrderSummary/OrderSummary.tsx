import { memo, useMemo } from 'react';
import type { SelectedService } from '../../types';
import { formatRUB } from '../../utils/format';
import { MESSAGES, BUTTON_LABELS } from '../../constants';
import SelectedServiceItem from '../SelectedServiceItem/SelectedServiceItem';
import styles from './OrderSummary.module.css';

interface OrderSummaryProps {
  selectedServices: SelectedService[];
  onRemove: (serviceId: string) => void;
  onCheckout: () => void;
}

const OrderSummary = ({ selectedServices, onRemove, onCheckout }: OrderSummaryProps) => {
  const totalAmount = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.price * s.quantity, 0),
    [selectedServices],
  );

  if (selectedServices.length === 0) {
    return (
      <div className={`${styles.summary} ${styles.empty}`}>
        <h2 className={styles.title}>Итого</h2>
        <p className={styles.emptyMessage}>{MESSAGES.EMPTY_CART}</p>
        <p className={styles.emptyHint}>{MESSAGES.EMPTY_CART_HINT}</p>
      </div>
    );
  }

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Итого</h2>
      <div className={styles.servicesList}>
        {selectedServices.map((service) => (
          <SelectedServiceItem key={service.id} service={service} onRemove={onRemove} />
        ))}
      </div>
      <div className={styles.total}>
        <span className={styles.totalLabel}>{MESSAGES.TOTAL_LABEL}</span>
        <span className={styles.totalAmount}>{formatRUB(totalAmount)}</span>
      </div>
      <button className={styles.checkoutButton} onClick={onCheckout}>
        {BUTTON_LABELS.CHECKOUT}
      </button>
    </div>
  );
};

export default memo(OrderSummary);
