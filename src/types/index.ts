export interface Service {
  id: string;
  name: string;
  price: number;
  description?: string;
  icon?: string;
}

export interface SelectedService extends Service {
  quantity: number;
}
