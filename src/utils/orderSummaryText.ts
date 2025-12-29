import type { SelectedService } from '../types';
import { formatRUB } from './format';
import { MESSAGES } from '../constants';

export function buildOrderAlertText(services: SelectedService[], totalAmount: number): string {
  const servicesText = services.map((s) => `- ${s.name} (${s.quantity} шт.)`).join('\n');

  return `${MESSAGES.ORDER_CONFIRMED}\n\n${MESSAGES.SERVICES_LABEL}\n${servicesText}\n\n${
    MESSAGES.TOTAL_LABEL
  } ${formatRUB(totalAmount)}`;
}
