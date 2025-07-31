// hooks/useDecks.ts
import { API_BASE_URL } from 'shared/const/strings';
import { useState, useEffect } from 'react';
import { Card, Deck, NewCard } from 'types';
import { AuthStore } from 'shared/stores/auth';
import { APIcreateCard, APIdeleteCard } from 'shared/api/cards';
import { getLocal } from 'shared/utils/common';
import { decksStore } from 'shared/stores/decks';

const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {savedDecks, setSavedDecks, currentDeck, setCurrentDeck} = decksStore();
  const {user} = AuthStore();

  // Fetch decks from API
  const fetchCards = async (did: string) => {
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

  const createCard = async(card: NewCard, did: string): Promise<Card|null> => {
   const newCard = await APIcreateCard(card, did, user?.token??await getLocal('JWT'));
   if(!newCard) return null;
   const updatedDeck = savedDecks.find(deck=>deck.id==did);
   updatedDeck?.cards.push(newCard);
   const updatedSavedDecks = savedDecks.map(deck=>{
    if(deck.id==did)return updatedDeck as Deck
    else return deck
   })
   setSavedDecks(updatedSavedDecks);
   return newCard;
  }

  const deleteCard = async(card_id: string): Promise<boolean> => {
    const success = await APIdeleteCard(card_id, user?.token??await getLocal('JWT'));
    if(!success) return false;
    const updatedCards = currentDeck?.cards.filter(c=>c.id!=card_id) as Card[];
    setSavedDecks(savedDecks.map(d=>{
      if(d.cards.map(c=>c.id).includes(card_id)) return {
        ...d,
        cards: updatedCards
      }

      return d
    }))
    setCurrentDeck({
      ... currentDeck,
      cards: updatedCards
    } as Deck);
    return true;
  }

  return { cards, loading, error, fetchCards, createCard, deleteCard};
};

export default useCards;
