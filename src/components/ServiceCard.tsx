import type { Service } from '../types';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  service: Service;
  onAdd: (service: Service) => void;
  isAdded: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onAdd, isAdded }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {service.icon && <span className={styles.icon}>{service.icon}</span>}
        <div className={styles.info}>
          <h3 className={styles.name}>{service.name}</h3>
          {service.description && (
            <p className={styles.description}>{service.description}</p>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.price}>{service.price.toLocaleString('ru-RU')} ₽</span>
        <button
          className={`${styles.button} ${isAdded ? styles.added : ''}`}
          onClick={() => onAdd(service)}
          disabled={isAdded}
        >
          {isAdded ? '✓ Добавлено' : 'Добавить'}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
