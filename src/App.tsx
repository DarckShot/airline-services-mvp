import { useState } from 'react';
import ServiceCard from './components/ServiceCard';
import OrderSummary from './components/OrderSummary';
import { mockServices } from './data/mockServices';
import type { Service, SelectedService } from './types';
import styles from './App.module.css';

function App() {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);

  const handleAddService = (service: Service) => {
    setSelectedServices((prev) => {
      const existingService = prev.find((s) => s.id === service.id);

      if (existingService) {
        return prev.map((s) =>
          s.id === service.id ? { ...s, quantity: s.quantity + 1 } : s
        );
      }

      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== serviceId));
  };

  const handleCheckout = () => {
    const totalAmount = selectedServices.reduce(
      (sum, service) => sum + service.price * service.quantity,
      0
    );

    alert(
      `Заказ оформлен!\n\nУслуги:\n${selectedServices
        .map((s) => `- ${s.name} (${s.quantity} шт.)`)
        .join('\n')}\n\nИтого: ${totalAmount.toLocaleString('ru-RU')} ₽`
    );

    // Очищаем корзину после оформления
    setSelectedServices([]);
  };

  const isServiceAdded = (serviceId: string) => {
    return selectedServices.some((s) => s.id === serviceId);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Дополнительные услуги</h1>
        <p className={styles.subtitle}>Сделайте ваш полёт ещё комфортнее</p>
      </header>

      <main className={styles.main}>
        <section className={styles.servicesSection}>
          <h2 className={styles.sectionTitle}>Доступные услуги</h2>
          <div className={styles.servicesGrid}>
            {mockServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onAdd={handleAddService}
                isAdded={isServiceAdded(service.id)}
              />
            ))}
          </div>
        </section>

        <aside className={styles.summarySection}>
          <OrderSummary
            selectedServices={selectedServices}
            onRemove={handleRemoveService}
            onCheckout={handleCheckout}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;
