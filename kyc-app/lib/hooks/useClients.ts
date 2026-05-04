import { useState, useCallback, useEffect } from 'react';
import { clientsApi, CreateClientPayload } from '../api/clients';

export function useClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await clientsApi.getClients();
      setClients(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createClient = useCallback(async (payload: CreateClientPayload) => {
    setIsLoading(true);
    try {
      await clientsApi.createClient(payload);
      await fetchClients();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchClients]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return {
    clients,
    isLoading,
    error,
    createClient,
    refreshClients: fetchClients
  };
}
