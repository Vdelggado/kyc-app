"use client";
import React, { useState } from 'react';
import { CreateClientPayload } from '../lib/api/clients';

const NACIONALIDADES = ['Panamá', 'Colombia', 'Venezuela', 'Costa Rica', 'México', 'Perú', 'Argentina', 'Chile', 'España', 'Estados Unidos', 'Otro'];
const ACTIVIDADES = ['Comerciante', 'Profesional Independiente', 'Empleado', 'Empresario', 'Jubilado', 'Estudiante', 'Otro'];
const ORIGENES = ['Salario', 'Efectivo', 'Negocio Propio', 'Inversiones', 'Venta de Activos', 'Herencia', 'Otro'];

interface ClientFormProps {
  onSubmit: (data: CreateClientPayload) => Promise<boolean>;
  isLoading: boolean;
}

export function ClientForm({ onSubmit, isLoading }: ClientFormProps) {
  const [formData, setFormData] = useState<CreateClientPayload>({
    name: '',
    dni: '',
    nationality: '',
    economicActivity: '',
    sourceOfFunds: '',
    estimatedMonthlyAmount: 0,
    useOfThirdParties: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : name === 'estimatedMonthlyAmount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success) {
      setFormData({ name: '', dni: '', nationality: '', economicActivity: '', sourceOfFunds: '', estimatedMonthlyAmount: 0, useOfThirdParties: false, });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#f0f4fa] p-8 rounded-2xl shadow-sm border border-[#e5edf6]">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Registrar Cliente</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" placeholder="Ej. Juan Pérez" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Identificación (DNI/Pasaporte)</label>
          <input required type="text" name="dni" value={formData.dni} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" placeholder="Ej. 8-000-0000" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nacionalidad</label>
          <select required name="nationality" value={formData.nationality} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white">
            <option value="">Seleccione...</option>
            {NACIONALIDADES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Actividad Económica</label>
           <select required name="economicActivity" value={formData.economicActivity} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white">
            <option value="">Seleccione...</option>
            {ACTIVIDADES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Origen de Fondos</label>
          <select required name="sourceOfFunds" value={formData.sourceOfFunds} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white">
            <option value="">Seleccione...</option>
            {ORIGENES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monto Estimado Mensual ($)</label>
          <input required type="number" min="0" name="estimatedMonthlyAmount" value={formData.estimatedMonthlyAmount || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white" placeholder="Ej. 2500" />
        </div>
      </div>
      <div className="mt-8 flex items-center bg-white p-4 rounded-xl border border-gray-200">
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" name="useOfThirdParties" checked={formData.useOfThirdParties} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500" />
          <span className="ml-3 text-sm font-medium text-gray-700">¿Utiliza dinero de terceros (uso indirecto)?</span>
        </label>
      </div>
      <div className="mt-8 flex justify-end">
        <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed">
          {isLoading ? 'Registrando...' : 'Registrar Cliente'}
        </button>
      </div>
    </form>
  );
}
