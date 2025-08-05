import { API_BASE_URL } from "shared/const/strings";
import { getLocal } from "shared/utils/common";
import { Deck, NewDeck } from "types";
import { json2Deck } from "./schemas";

const baseURL = API_BASE_URL+'/decks';

export const APIgetDecks = async (page: number, token: string): Promise<Deck[]|null> => {
    try {
        const res = await fetch(`${baseURL}?page=${page}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        });
    
        if (!res.ok) throw new Error('Failed to fetch decks');
    
        const json = await res.json();
        const decks = json.map((deck: any) => {
            return json2Deck(deck);
        });
        return decks;
    } catch (err: any) {
        console.log('ERROR FETCHING DECKS: ', err)
        return null;
    }
}

export const APIgetSavedDecks = async (token: string): Promise<Deck[]|null> => {
    try{
      const res = await fetch(API_BASE_URL+'/saved',{
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
      const processedDecks = json.map((deck: any) => json2Deck(deck));
      return processedDecks;
    }catch(err: any){
      console.log('Error fetching saved decks:', err);
        return null;
    }
}

export const APIgetDeckById = async (id: string): Promise<Deck | null> => {
    try {
      const res = await fetch(`${baseURL}/${id}`, {
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
      return json2Deck(json);
    } catch (err: any) {
      console.log('Error fetching deck by ID:', err);
      return null;
    }
}

export const APIcreateDeck = async (deck: NewDeck, token: string): Promise<Deck | null> => {
    try{
        const res = await fetch(`${baseURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(deck)
        });
        const json = await res.json();
        return json2Deck(json);
    } catch (err: any) {
        console.log('ERROR CREATING DECK: ', err)
        return null;
    }
}

export const APIsaveDeck = async (deck: Deck, token: string): Promise<boolean> => {
    try {
        const res = await fetch(`${API_BASE_URL}/saved/`+deck.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error(await res.text());
        return true;
    } catch (err: any) {
        console.log('ERROR SAVING DECK: ', err)
        return false;
    }
}

export const APIremoveSavedDeck = async (deck: Deck, token: string): Promise<boolean> => {
  try{
    const res = await fetch(`${API_BASE_URL}/saved/`+deck.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to forget deck: ${errorText}`);
    }
    return true;
  } catch(err: any){
    console.log('Error forgetting deck:', err);
    return false;
  }
}

export const APIdeleteDeck = async (id: string, token: string): Promise<boolean> => {
  try{
    const res = await fetch(API_BASE_URL+'/decks/'+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    
    if(res.status!=204){
      const errorText = await res.text();
      throw new Error(`Failed to delete deck: ${errorText}`)
    }
    return true;

  }catch(err: any){
    console.log('Error deleting deck: ', err);
    return false;
  }
}

export const APIsearchDecks = async (text: string, token: string): Promise<Deck[]|null> => {
  try{
    const res = await fetch(baseURL+'?search='+text, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+token
      }
    });

    if (!res.ok) throw new Error(await res.text());

    const json = await res.json() as any[];

    return json.map(item=>json2Deck(item));
  }catch(err){
    console.log('Failed to search decks: ', err);
    return null;
  }
}
