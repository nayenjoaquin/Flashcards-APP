import { API_BASE_URL } from "shared/const/strings";
import { getLocal } from "shared/utils/common";
import { Deck } from "types";
import { json2Deck } from "./schemas";

const baseURL = API_BASE_URL+'/decks';

export const getDecks = async () => {
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
        const decks = json.map(deck => {
            json2Deck(deck);
        });
    } catch (err: any) {
        console.log('ERROR FETCHING DECKS: ', err)
        return [];
    }
}

export const createDeck = async (deck: Deck, token: string) => {
    try{
        const res = await fetch(`${API_BASE_URL}/decks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(deck)
        });

        if (!res.ok) throw new Error('Failed to create deck');

        const json = await res.json() as Deck;
        json.last_reviewed_at = json.last_reviewed_at ? new Date(json.last_reviewed_at) : null;
        return json;
    } catch (err: any) {
        console.log('ERROR CREATING DECK: ', err)
        return null;
    }
}