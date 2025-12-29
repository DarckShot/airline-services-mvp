import { memo } from 'react';
import type { Service } from '../../types';
import { formatRUB } from '../../utils/format';
import { BUTTON_LABELS } from '../../constants';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  service: Service;
  onAdd: (service: Service) => void;
  isAdded: boolean;
}

const ServiceCard = ({ service, onAdd, isAdded }: ServiceCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {service.icon && <span className={styles.icon}>{service.icon}</span>}
        <div className={styles.info}>
          <h3 className={styles.name}>{service.name}</h3>
          {service.description && <p className={styles.description}>{service.description}</p>}
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.price}>{formatRUB(service.price)}</span>
        <button
          className={`${styles.button} ${isAdded ? styles.added : ''}`}
          onClick={() => onAdd(service)}
          disabled={isAdded}
        >
          {isAdded ? BUTTON_LABELS.ADDED : BUTTON_LABELS.ADD}
        </button>
      </div>
    </div>
  );
};

export default memo(ServiceCard);
