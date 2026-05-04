const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface CreateClientPayload {
  name: string;
  dni: string;
  nationality?: string;
  economicActivity: string;
  sourceOfFunds: string;
  estimatedMonthlyAmount: number;
  useOfThirdParties?: boolean;
}

export const clientsApi = {
  async getClients() {
    const res = await fetch(`${API_BASE_URL}/clients`);
    if (!res.ok) throw new Error('Failed to fetch clients');
    return res.json();
  },

  async createClient(payload: CreateClientPayload) {
    const res = await fetch(`${API_BASE_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create client');
    return res.json();
  }
};
