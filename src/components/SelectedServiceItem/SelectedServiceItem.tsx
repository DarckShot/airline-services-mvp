import { memo } from 'react';
import type { SelectedService } from '../../types';
import { formatRUB } from '../../utils/format';
import styles from './SelectedServiceItem.module.css';

interface SelectedServiceItemProps {
  service: SelectedService;
  onRemove: (serviceId: string) => void;
}

const SelectedServiceItem = ({ service, onRemove }: SelectedServiceItemProps) => {
  return (
    <div className={styles.serviceItem}>
      <div className={styles.serviceInfo}>
        <span className={styles.serviceName}>
          {service.icon && <span className={styles.iconSmall}>{service.icon}</span>}
          {service.name}
        </span>
        {service.quantity > 1 && <span className={styles.quantity}>× {service.quantity}</span>}
      </div>
      <div className={styles.serviceActions}>
        <span className={styles.servicePrice}>{formatRUB(service.price * service.quantity)}</span>
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
  );
};

export default memo(SelectedServiceItem);
