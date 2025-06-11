// hooks/useDecks.ts
import { API_BASE_URL } from 'shared/const/strings';
import { useState, useEffect } from 'react';

const useCards = (did: string) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch decks from API
  const fetchCards = async () => {
    setLoading(true);
    setError(null);

    try {
        const res = await fetch(`${API_BASE_URL}/flashcards?did=`+did, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!res.ok) throw new Error('Failed to fetch flashcards');
  
        const json = await res.json();
        setCards(json);
      } catch (err: any) {
        console.log('ERROR: ', err)
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
  };

  const createCard = async(card: NewCard) => {
    try{
      const res = await fetch(API_BASE_URL+'/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
          ...card,
          deck_id: did
        })
      });

      if(!res.ok){
        const text = await res.text()
        throw new Error(`Failed to create card: ${text}`);
      }

      const newCard = await res.json() as Card;
      setCards(prev=>([
        newCard,
        ...prev
      ]))

    } catch(err:any){
      console.error(err);
      
    }
  }

  useEffect(() => {
    fetchCards();
  }, []); // Empty array means it only runs once, similar to componentDidMount

  return { cards, loading, error, fetchCards, createCard };
};

export default useCards;
