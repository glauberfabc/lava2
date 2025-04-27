export interface Vehicle {
  id: string;
  licensePlate: string;
  customerName: string;
  customerPhone: string;
  timestamp: number;
  status: 'waiting' | 'in-progress' | 'completed';
}

export type VehicleStatus = 'waiting' | 'in-progress' | 'completed';

export interface User {
  email: string;
  id: string;
}