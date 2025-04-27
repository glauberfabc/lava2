import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import Header from './components/Header';
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList';
import SearchBar from './components/SearchBar';
import AuthForm from './components/AuthForm';
import { getVehicles, searchVehicles } from './utils/storage';
import { Vehicle, User } from './types';

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load vehicles from storage
  const loadVehicles = () => {
    try {
      const data = getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (user) {
      loadVehicles();
    }
  }, [user]);

  // Handle search
  const handleSearch = (query: string) => {
    const results = searchVehicles(query);
    setVehicles(results);
  };

  // Filter vehicles by status
  const getFilteredVehicles = (status: Vehicle['status']) => {
    return vehicles.filter(vehicle => vehicle.status === status);
  };

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="md:flex md:space-x-6">
          {/* Left sidebar with form */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <VehicleForm onAdd={loadVehicles} />
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Estatísticas</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-2 rounded shadow-sm">
                  <p className="text-yellow-500 font-bold text-xl">{getFilteredVehicles('waiting').length}</p>
                  <p className="text-gray-600 text-xs">Aguardando</p>
                </div>
                <div className="bg-white p-2 rounded shadow-sm">
                  <p className="text-blue-500 font-bold text-xl">{getFilteredVehicles('in-progress').length}</p>
                  <p className="text-gray-600 text-xs">Em Lavagem</p>
                </div>
                <div className="bg-white p-2 rounded shadow-sm">
                  <p className="text-green-500 font-bold text-xl">{getFilteredVehicles('completed').length}</p>
                  <p className="text-gray-600 text-xs">Concluídos</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content with vehicle list */}
          <div className="md:w-2/3">
            <SearchBar onSearch={handleSearch} />
            
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-600">Carregando veículos...</p>
              </div>
            ) : (
              <VehicleList vehicles={vehicles} onUpdate={loadVehicles} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;