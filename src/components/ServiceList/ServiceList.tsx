import type { Service } from '../../types';
import ServiceCard from '../ServiceCard/ServiceCard';
import styles from './ServiceList.module.css';
import { memo } from 'react';

interface ServiceListProps {
  services: Service[];
  onAddService: (service: Service) => void;
  isServiceAdded: (serviceId: string) => boolean;
}

const ServiceList = ({ services, onAddService, isServiceAdded }: ServiceListProps) => {
  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.sectionTitle}>Доступные услуги</h2>
      <div className={styles.servicesGrid}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onAdd={onAddService}
            isAdded={isServiceAdded(service.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(ServiceList);
