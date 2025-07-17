import { API_BASE_URL } from "shared/const/strings";
import { getLocal } from "shared/utils/common";
import { Deck } from "types";

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
        json.forEach(deck => {
            deck.last_reviewed_at = deck.last_reviewed_at ? new Date(deck.last_reviewed_at) : null;
        });
        return json;
    } catch (err: any) {
        console.log('ERROR FETCHING DECKS: ', err)
    }
}