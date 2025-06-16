// hooks/useDecks.ts
import { API_BASE_URL } from 'shared/const/strings';
import { useState, useEffect } from 'react';
import { AuthStore } from 'shared/stores/auth';
import { decksStore } from 'shared/stores/decks';
import { getLocal } from 'shared/utils/common';

const useDecks = () => {
  const {decks, setDecks} = decksStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {user} = AuthStore();

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

  const getDeckbyId = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/decks/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      const json = await res.json();
      setLoading(false);
      return json;
    } catch (err: any) {
      console.error('Error fetching deck by ID:', err);
      setError(err.message || 'Unknown error');
      setLoading(false);
      return null;
    }
  };

  const getSavedDecks = async () => {
    setLoading(true);
    setError(null);
    const token = await getLocal('JWT');

    try{
      const res = await fetch(API_BASE_URL+'/saved',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      const json = await res.json();
      setDecks(json);
      setLoading(false);
      return json;
    }catch(err: any){
      console.error('Error fetching saved decks:', err);
      setError(err.message || 'Unknown error');
    }
  }

  const createDeck = async (deck: NewDeck)=>{
    try{
      const res = await fetch(API_BASE_URL+'/decks', {
        method: 'POST',
        headers:{
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
          ...deck,
          user_id: user?.id
        })
      })

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to create deck: ${errorText}`);
      }

      const newDeck = await res.json() as Deck
      setDecks([
        newDeck,
        ...decks
      ]);
    }catch(err: any){
      console.error(err);
      
      
    }
}

const deleteDeck= async (id: string) => {
  try{
    const res = await fetch(API_BASE_URL+'/decks/'+id, {
      method: 'DELETE',
    })
    
    if(res.status!=204){
      const errorText = await res.text();
      throw new Error(`Failed to delete deck: ${errorText}`)
    }

    setDecks(decks.filter(deck => deck.id !== id));

  }catch(err: any){
    console.error(err);
    
  }
}

  return { decks, loading, error, fetchDecks, createDeck, deleteDeck, getSavedDecks, getDeckbyId};
};

export default useDecks;
