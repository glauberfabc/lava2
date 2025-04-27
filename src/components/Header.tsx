import React from 'react';
<<<<<<< HEAD
import { Droplets, LogOut } from 'lucide-react';
import { supabase } from '../utils/supabase';

const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Droplets className="h-8 w-8 mr-3 text-blue-100" />
            <h1 className="text-2xl font-bold">Lava Rápido</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sair
          </button>
        </div>
        <p className="text-blue-100 text-sm mt-1">
=======
import { Droplets } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-center md:justify-start">
          <Droplets className="h-8 w-8 mr-3 text-blue-100" />
          <h1 className="text-2xl font-bold">Lava Rápido</h1>
        </div>
        <p className="text-center md:text-left text-blue-100 text-sm mt-1">
>>>>>>> aa06476fbe3b49b1283a030f8113703d81409179
          Sistema de gerenciamento de veículos
        </p>
      </div>
    </header>
  );
};

export default Header;