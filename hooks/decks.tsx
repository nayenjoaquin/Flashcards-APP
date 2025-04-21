// hooks/useDecks.ts
import { API_BASE_URL } from 'const/strings';
import { useState, useEffect } from 'react';

const useDecks = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch decks from API
  const fetchDecks = async () => {
    setLoading(true);
    setError(null);

    try {
        const res = await fetch(`${API_BASE_URL}/decks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!res.ok) throw new Error('Failed to fetch decks');
  
        const json = await res.json();
        setDecks(json);
      } catch (err: any) {
        console.log('ERROR: ', err)
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchDecks();
  }, []); // Empty array means it only runs once, similar to componentDidMount

  return { decks, loading, error, fetchDecks };
};

export default useDecks;
