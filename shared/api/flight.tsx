export const flightApi = {
    getFlights: async (limit: number = 500) => {
      const response = await fetch(`http://127.0.0.1:8000/api/flights?limit=${limit}`);
      return response.json();
    }
  };