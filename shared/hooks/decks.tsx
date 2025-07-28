// hooks/useDecks.ts
import { API_BASE_URL } from 'shared/const/strings';
import { useState, useEffect } from 'react';
import { AuthStore } from 'shared/stores/auth';
import { decksStore } from 'shared/stores/decks';
import { getLocal } from 'shared/utils/common';
import { Deck, NewDeck, ProgressMap } from 'types';
import { json2Deck } from 'shared/api/schemas';
import { APIgetDeckById, APIgetSavedDecks } from 'shared/api/decks';

const useDecks = () => {
  const {savedDecks, setSavedDecks, currentDeck, setCurrentDeck} = decksStore();
  const [loading, setLoading] = useState<boolean>(false);
  const {user} = AuthStore();

  const getDeckById = async (id: string) => {
    setLoading(true);
    const json = await APIgetDeckById(id);
    if (!json) {
      setLoading(false);
      return null;
    }
    const deck = json2Deck(json);
    setCurrentDeck(deck);
    setLoading(false);
    return deck;
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
    } catch(err: any){
      console.log('Error forgetting deck:', err);
    }
  };

  const getSavedDecks = async () => {
    const token = await getLocal('JWT');

    const savedDecks = await APIgetSavedDecks();
    if (savedDecks!= null) {
      setSavedDecks(savedDecks);
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

  return { currentDeck, setCurrentDeck, savedDecks, removeSavedDeck, loading, saveDeck, createDeck, deleteDeck, getSavedDecks, getDeckById};
};

export default useDecks;
