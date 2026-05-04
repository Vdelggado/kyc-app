import { RiskBadge } from './RiskBadge';

interface ClientTableProps {
  clients: any[];
}

export function ClientTable({ clients }: ClientTableProps) {
  if (!clients || clients.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
        <p className="text-gray-500">No hay clientes registrados aún.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="uppercase tracking-wider border-b border-gray-100 bg-gray-50/50 text-gray-500">
            <tr>
              <th className="px-6 py-4 font-medium">Cliente</th>
              <th className="px-6 py-4 font-medium">Identificación</th>
              <th className="px-6 py-4 font-medium">Actividad Econ.</th>
              <th className="px-6 py-4 font-medium">Riesgo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{client.name}</td>
                <td className="px-6 py-4 text-gray-600">{client.dni}</td>
                <td className="px-6 py-4 text-gray-600">{client.economicActivity}</td>
                <td className="px-6 py-4">
                  {/* Assumes risk relationship is joined if populated, otherwise placeholder */}
                  <RiskBadge level={client.risks?.[0]?.riskLevel || 'N/A'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
