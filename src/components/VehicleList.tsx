import React from 'react';
import { Vehicle, VehicleStatus } from '../types';
import { Clock, CheckCircle, Play, X, Phone } from 'lucide-react';
import { updateVehicleStatus, removeVehicle } from '../utils/storage';

interface VehicleListProps {
  vehicles: Vehicle[];
  onUpdate: () => void;
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles, onUpdate }) => {
  // Format timestamp to readable date/time
  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status icon and color
  const getStatusDetails = (status: VehicleStatus) => {
    switch (status) {
      case 'waiting':
        return {
          icon: <Clock className="h-5 w-5" />,
          color: 'text-yellow-500 bg-yellow-50'
        };
      case 'in-progress':
        return {
          icon: <Play className="h-5 w-5" />,
          color: 'text-blue-500 bg-blue-50'
        };
      case 'completed':
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          color: 'text-green-500 bg-green-50'
        };
      default:
        return {
          icon: <Clock className="h-5 w-5" />,
          color: 'text-gray-500 bg-gray-50'
        };
    }
  };

  // Handle status update
  const handleStatusChange = (id: string, status: VehicleStatus) => {
    updateVehicleStatus(id, status);
    onUpdate();
  };

  // Handle vehicle removal
  const handleRemove = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este veículo?')) {
      removeVehicle(id);
      onUpdate();
    }
  };

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum veículo registrado.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {vehicles.map((vehicle) => {
        const { icon, color } = getStatusDetails(vehicle.status);
        
        return (
          <div 
            key={vehicle.id} 
            className="bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg">{vehicle.licensePlate}</h3>
                <p className="text-gray-700">{vehicle.customerName}</p>
                <p className="text-gray-600 flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-1" />
                  {vehicle.customerPhone}
                </p>
                <p className="text-gray-500 text-sm">
                  Entrada: {formatTime(vehicle.timestamp)}
                </p>
              </div>
              
              <div className={`px-2 py-1 rounded-md flex items-center ${color}`}>
                {icon}
                <span className="ml-1 text-sm capitalize">
                  {vehicle.status === 'waiting' ? 'Aguardando' : 
                   vehicle.status === 'in-progress' ? 'Em Lavagem' : 'Concluído'}
                </span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between space-x-2">
              {vehicle.status !== 'waiting' && (
                <button 
                  onClick={() => handleStatusChange(vehicle.id, 'waiting')}
                  className="flex-1 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
                >
                  Aguardando
                </button>
              )}
              
              {vehicle.status !== 'in-progress' && (
                <button 
                  onClick={() => handleStatusChange(vehicle.id, 'in-progress')}
                  className="flex-1 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Iniciar
                </button>
              )}
              
              {vehicle.status !== 'completed' && (
                <button 
                  onClick={() => handleStatusChange(vehicle.id, 'completed')}
                  className="flex-1 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  Concluir
                </button>
              )}
              
              <button 
                onClick={() => handleRemove(vehicle.id)}
                className="flex-none ml-1 p-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                aria-label="Remover veículo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VehicleList;