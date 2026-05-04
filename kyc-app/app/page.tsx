"use client";

import { useClients } from "../lib/hooks/useClients";
import { ClientForm } from "../components/ClientForm";
import { ClientTable } from "../components/ClientTable";

export default function Home() {
  const { clients, isLoading, error, createClient } = useClients();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl space-y-12">
        <header className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl border-b border-gray-200 pb-4 inline-block">
            Modulo kyc
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-500">
            Registro y gestión de clientes. El nivel de riesgo se evaluar automticamente segn los parmetros aportados.
          </p>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl shadow-sm">
            <p className="font-semibold text-sm">Ocurrio un error: {error}</p>
          </div>
        )}

        <section>
          <ClientForm onSubmit={createClient} isLoading={isLoading} />
        </section>

        <section className="pt-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Directorio de Clientes</h2>
            <span className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
              Total: {clients?.length || 0}
            </span>
          </div>
          <TabBar />
          <ClientTable clients={clients} />
        </section>
      </div>
    </div>
  );
}

function TabBar() {
  return (
    <div className="flex space-x-2 mb-4">
       <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm">Todos</button>
       <button className="bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">Alertas Generadas</button>
    </div>
  )
}
