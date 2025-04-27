<<<<<<< HEAD
import React, { useState, useRef } from 'react';
import { Car, Camera } from 'lucide-react';
import { addVehicle } from '../utils/storage';
import { createWorker } from 'tesseract.js';
=======
import React, { useState } from 'react';
import { Car } from 'lucide-react';
import { addVehicle } from '../utils/storage';
>>>>>>> aa06476fbe3b49b1283a030f8113703d81409179

interface VehicleFormProps {
  onAdd: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ onAdd }) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
<<<<<<< HEAD
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Erro ao acessar a câmera');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsProcessing(true);
    setError('');

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const worker = await createWorker('por');
      const { data: { text } } = await worker.recognize(canvas);
      await worker.terminate();

      // Extract potential license plate (basic pattern matching for Brazilian plates)
      const platePattern = /[A-Z]{3}[-]?\d{4}/i;
      const match = text.match(platePattern);

      if (match) {
        setLicensePlate(match[0].toUpperCase());
      } else {
        setError('Não foi possível identificar a placa');
      }
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Erro ao processar imagem');
    } finally {
      setIsProcessing(false);
      stopCamera();
    }
  };
=======
>>>>>>> aa06476fbe3b49b1283a030f8113703d81409179

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
<<<<<<< HEAD
=======
    // Basic validation
>>>>>>> aa06476fbe3b49b1283a030f8113703d81409179
    if (!licensePlate.trim() || !customerName.trim() || !customerPhone.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      addVehicle(licensePlate, customerName, customerPhone);
<<<<<<< HEAD
=======
      
      // Reset form
>>>>>>> aa06476fbe3b49b1283a030f8113703d81409179
      setLicensePlate('');
      setCustomerName('');
      setCustomerPhone('');
      onAdd();
<<<<<<< HEAD
=======
      
      // Animation delay for button
>>>>>>> aa06476fbe3b49b1283a030f8113703d81409179
      setTimeout(() => setIsSubmitting(false), 600);
    } catch (err) {
      setError('Erro ao adicionar veículo.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 transition-all">
      <div className="flex items-center mb-4">
        <Car className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Novo Veículo</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
            Placa do Veículo
          </label>
<<<<<<< HEAD
          <div className="flex space-x-2">
            <input
              type="text"
              id="licensePlate"
              placeholder="AAA-0000"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              maxLength={8}
            />
            <button
              type="button"
              onClick={startCamera}
              className="px-3 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
              title="Ler placa com câmera"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>
=======
          <input
            type="text"
            id="licensePlate"
            placeholder="AAA-0000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            maxLength={8}
          />
>>>>>>> aa06476fbe3b49b1283a030f8113703d81409179
        </div>
        
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Cliente
          </label>
          <input
            type="text"
            id="customerName"
            placeholder="Nome completo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone do Cliente
          </label>
          <input
            type="tel"
            id="customerPhone"
            placeholder="(00) 00000-0000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </div>
        
        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}
        
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-all ${
            isSubmitting
              ? 'bg-green-500 transform scale-95'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adicionando...' : 'Adicionar Veículo'}
        </button>
      </form>
<<<<<<< HEAD

      {/* Camera UI */}
      <div className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center ${videoRef.current?.srcObject ? 'block' : 'hidden'}`}>
        <div className="bg-white p-4 rounded-lg max-w-lg w-full mx-4">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={captureImage}
              disabled={isProcessing}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              {isProcessing ? 'Processando...' : 'Capturar Placa'}
            </button>
            <button
              onClick={stopCamera}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
=======
>>>>>>> aa06476fbe3b49b1283a030f8113703d81409179
    </div>
  );
};

export default VehicleForm;