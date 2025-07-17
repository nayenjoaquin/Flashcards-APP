// hooks/useDecks.ts
import { API_BASE_URL } from 'shared/const/strings';
import { useState, useEffect } from 'react';
import { AuthStore } from 'shared/stores/auth';
import { decksStore } from 'shared/stores/decks';
import { getLocal } from 'shared/utils/common';
import { Deck, NewDeck } from 'types';

const useDecks = () => {
  const {savedDecks, setSavedDecks} = decksStore();
  const [decks, setDecks] = useState<Deck[]|undefined>(undefined);
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
            'Authorization': `Bearer ${await getLocal('JWT')}`,
          },
        });
  
        if (!res.ok) throw new Error('Failed to fetch decks');
  
        const json = await res.json() as Deck[];
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
          'Authorization': `Bearer ${await getLocal('JWT')}`,
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
      console.log('Error fetching deck by ID:', err);
      setError(err.message || 'Unknown error');
      setLoading(false);
      return null;
    }
  };
  
  const saveDeck = async (deck: Deck) => {
    try{
      const res = await fetch(`${API_BASE_URL}/saved/`+deck.id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getLocal('JWT')}`,
        },
        body: JSON.stringify(deck),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to save deck: ${errorText}`);
      }
      setSavedDecks([deck, ...savedDecks]);
      setDecks(prev=>{
        const updatedDecks = prev?.map(d =>{
          if(d.id === deck.id){
            return {...d, saved: d.saved + 1};
          }
          return d;
        });
        return updatedDecks;
      })
    } catch(err: any){
      console.log('Error saving deck:', err);
    }
  };

  const removeSavedDeck = async (deck: Deck) => {
    try{
      const res = await fetch(`${API_BASE_URL}/saved/`+deck.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getLocal('JWT')}`,
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to forget deck: ${errorText}`);
      }
      setSavedDecks(savedDecks.filter(d => d.id !== deck.id));
      setDecks(prev=>{
        const updatedDecks = prev?.map(d =>{
          if(d.id === deck.id){
            return {...d, saved: d.saved - 1};
          }
          return d;
        });
        return updatedDecks;
      });
    } catch(err: any){
      console.log('Error forgetting deck:', err);
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
      const json = await res.json() as Deck[];
      json.forEach(deck => {
        deck.last_reviewed_at = new Date(deck.last_reviewed_at?? Date.now());
        deck.created_at = new Date(deck.created_at);
      });
      setSavedDecks(json);
      setLoading(false);
      return json;
    }catch(err: any){
      console.log('Error fetching saved decks:', err);
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

      const newDeck = await res.json() as Deck;
      await saveDeck(newDeck);
    }catch(err: any){
      console.log('Error creating deck: ', err);
      
      
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

    setSavedDecks(savedDecks.filter(deck => deck.id !== id));

  }catch(err: any){
    console.log('Error deleting deck: ', err);
    
  }
}

const searchDeck = async (search: string) => {
  try{
    const res = await fetch(API_BASE_URL+'/decks?search='+search, {
      method: 'GET',

    })

    if (!res.ok){
      throw new Error('failed to search decks: ' + await res.text())
    }

    const fetchedDecks = await res.json() as Deck[]
    setDecks(fetchedDecks)
    

  }catch(err){
    console.log('Error searching decks: ', err);
    setDecks([])
    
  }
}
const updateDecks = async (deck: Deck) => {
  setDecks(prev => {
    if (!prev) return [deck];
    return prev.map(d => d.id === deck.id ? deck : d);
  });
  setSavedDecks(savedDecks.map(d => d.id === deck.id ? deck : d));
}

  return { decks, savedDecks, removeSavedDeck, setDecks, updateDecks, searchDeck, loading, error, fetchDecks, saveDeck, createDeck, deleteDeck, getSavedDecks, getDeckbyId};
};

export default useDecks;
