import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Service, SelectedService } from '../types';
import { STORAGE_KEYS, MESSAGES } from '../constants';

export interface UseSelectedServicesResult {
  selectedServices: SelectedService[];
  addService: (service: Service) => void;
  removeService: (serviceId: string) => void;
  clear: () => void;
  isServiceAdded: (serviceId: string) => boolean;
  totalAmount: number;
}

const STORAGE_KEY = STORAGE_KEYS.CART;

function getStoredServices(): SelectedService[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is SelectedService =>
        item &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0,
    );
  } catch (error) {
    console.error(MESSAGES.STORAGE_READ_ERROR, error);
    return [];
  }
}

function saveToStorage(services: SelectedService[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  } catch (error) {
    console.error(MESSAGES.STORAGE_WRITE_ERROR, error);
  }
}

export function useSelectedServices(): UseSelectedServicesResult {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(getStoredServices);

  useEffect(() => {
    saveToStorage(selectedServices);
  }, [selectedServices]);

  const addService = useCallback((service: Service) => {
    setSelectedServices((prev) => {
      const existing = prev.find((s) => s.id === service.id);
      if (existing) {
        return prev.map((s) => (s.id === service.id ? { ...s, quantity: s.quantity + 1 } : s));
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  }, []);

  const removeService = useCallback((serviceId: string) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== serviceId));
  }, []);

  const clear = useCallback(() => {
    setSelectedServices([]);
  }, []);

  const isServiceAdded = useCallback(
    (serviceId: string) => selectedServices.some((s) => s.id === serviceId),
    [selectedServices],
  );

  const totalAmount = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.price * s.quantity, 0),
    [selectedServices],
  );

  return {
    selectedServices,
    addService,
    removeService,
    clear,
    isServiceAdded,
    totalAmount,
  };
}
