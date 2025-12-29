import Header from './components/Header/Header';
import ServiceList from './components/ServiceList/ServiceList';
import OrderSummary from './components/OrderSummary/OrderSummary';
import { mockServices } from './data/mockServices';
import { useSelectedServices } from './hooks/useSelectedServices';
import { buildOrderAlertText } from './utils/orderSummaryText';
import styles from './App.module.css';

function App() {
  const { selectedServices, addService, removeService, clear, isServiceAdded, totalAmount } =
    useSelectedServices();

  const handleCheckout = () => {
    alert(buildOrderAlertText(selectedServices, totalAmount));
    clear();
  };

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <ServiceList
          services={mockServices}
          onAddService={addService}
          isServiceAdded={isServiceAdded}
        />

        <aside className={styles.summarySection}>
          <OrderSummary
            selectedServices={selectedServices}
            onRemove={removeService}
            onCheckout={handleCheckout}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;
