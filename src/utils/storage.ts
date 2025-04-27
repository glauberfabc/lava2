import { Vehicle } from '../types';

// Local storage key
const STORAGE_KEY = 'carwash-vehicles';

// Get all vehicles from storage
export const getVehicles = (): Vehicle[] => {
  const vehicles = localStorage.getItem(STORAGE_KEY);
  return vehicles ? JSON.parse(vehicles) : [];
};

// Add a new vehicle
export const addVehicle = (licensePlate: string, customerName: string, customerPhone: string): Vehicle => {
  const vehicles = getVehicles();
  
  // Create new vehicle object
  const newVehicle: Vehicle = {
    id: Date.now().toString(),
    licensePlate: licensePlate.toUpperCase(),
    customerName,
    customerPhone,
    timestamp: Date.now(),
    status: 'waiting'
  };
  
  // Save to storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...vehicles, newVehicle]));
  
  return newVehicle;
};

// Update vehicle status
export const updateVehicleStatus = (id: string, status: Vehicle['status']): Vehicle | null => {
  const vehicles = getVehicles();
  const vehicleIndex = vehicles.findIndex(vehicle => vehicle.id === id);
  
  if (vehicleIndex === -1) return null;
  
  const updatedVehicle = {
    ...vehicles[vehicleIndex],
    status
  };
  
  vehicles[vehicleIndex] = updatedVehicle;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  
  return updatedVehicle;
};

// Remove a vehicle
export const removeVehicle = (id: string): boolean => {
  const vehicles = getVehicles();
  const filteredVehicles = vehicles.filter(vehicle => vehicle.id !== id);
  
  if (filteredVehicles.length === vehicles.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredVehicles));
  return true;
};

// Search vehicles
export const searchVehicles = (query: string): Vehicle[] => {
  if (!query.trim()) return getVehicles();
  
  const vehicles = getVehicles();
  const lowerQuery = query.toLowerCase();
  
  return vehicles.filter(
    vehicle => 
      vehicle.licensePlate.toLowerCase().includes(lowerQuery) || 
      vehicle.customerName.toLowerCase().includes(lowerQuery) ||
      vehicle.customerPhone.includes(lowerQuery)
  );
};