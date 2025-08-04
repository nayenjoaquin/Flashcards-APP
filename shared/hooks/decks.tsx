// hooks/useDecks.ts
import { API_BASE_URL } from 'shared/const/strings';
import { useState, useEffect } from 'react';
import { AuthStore } from 'shared/stores/auth';
import { decksStore } from 'shared/stores/decks';
import { getLocal } from 'shared/utils/common';
import { Deck, NewDeck, ProgressMap } from 'types';
import { json2Deck } from 'shared/api/schemas';
import { APIcreateDeck, APIdeleteDeck, APIgetDeckById, APIgetSavedDecks, APIremoveSavedDeck, APIsaveDeck } from 'shared/api/decks';
import { sessionStore } from 'shared/stores/last-session';

const useDecks = () => {
  const {savedDecks, setSavedDecks, currentDeck, setCurrentDeck} = decksStore();
  const [loading, setLoading] = useState<boolean>(false);
  const {lastSession, setLastSession} = sessionStore();
  const {user} = AuthStore();

  const getDeckById = async (id: string) => {
    setLoading(true);
    const fetchedDeck = await APIgetDeckById(id);
    if (!fetchedDeck) {
      setLoading(false);
      return null;
    }
    setLoading(false);
    return fetchedDeck;
  };
  
  const saveDeck = async (deck: Deck) => {
    const success = await APIsaveDeck(deck, user?.token ?? await getLocal('JWT'));
    if (!success) return false;
    const newSavedDecks = [deck, ...savedDecks];
    
    setSavedDecks(newSavedDecks);
    return true;
  };

  const removeSavedDeck = async (deck: Deck) => {
    const success = await APIremoveSavedDeck(deck, user?.token ?? await getLocal('JWT'));
    if (!success) return null;
    setSavedDecks(savedDecks.filter(d => d.id != deck.id));
    return success;
  };

  const getSavedDecks = async () => {

    const savedDecks = await APIgetSavedDecks(user?.token ?? await getLocal('JWT'));
    if (savedDecks!= null) {
      setSavedDecks(savedDecks);
        
    }
  }

  const createDeck = async (deck: NewDeck)=>{
    const newDeck = await APIcreateDeck(deck, user?.token??await getLocal('JWT'));
    if(!newDeck) return null;
    await saveDeck(newDeck);
    return newDeck;
}

const deleteDeck= async (id: string) => {

  const success = await APIdeleteDeck(id, user?.token ?? await getLocal('JWT'));
  if (!success) return false;
  setSavedDecks(savedDecks.filter(deck => deck.id !== id));
  if(lastSession?.deck_id==id) setLastSession(null);
  setCurrentDeck(null);
  return true;
}

  return { currentDeck, setCurrentDeck, savedDecks, removeSavedDeck, loading, saveDeck, createDeck, deleteDeck, getSavedDecks, getDeckById};
};

export default useDecks;
