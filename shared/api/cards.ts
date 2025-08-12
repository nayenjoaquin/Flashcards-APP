import { API_BASE_URL } from "shared/const/strings";
import { Card, Deck, NewCard } from "types";
import { json2Card, json2Deck } from "./schemas";

const base_url = API_BASE_URL + '/flashcards'

export const APIcreateCard = async (card: NewCard, deck_id: string, token: string) => {
    try{
        const res = await fetch(base_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
            ...card,
            deck_id: deck_id
        })
        });

        if(res.status!=201){
        const text = await res.text()
        throw new Error(`Failed to create card: ${text}`);
        }

        const newCard = json2Card(await res.json());
        return newCard;

    } catch(err:any){
        console.log('Error creating flashcard: ', err);
        return null;
        
    }
}

export const APIdeleteCard = async (card_id: string, token: string): Promise<boolean> => {
    console.log('USING TOKEN: ', token);
    

    try{
        const res = await fetch(base_url+'/'+card_id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer '+token
            }
        });

        if(res.status!=204) throw new Error(await res.text());

        return true;

    }catch(err){
        console.log('FAILED TO DELETE CARD: ', err);
        
        return false;
    }

}

export const APIupdateCard = async (card: Card, token: string): Promise<boolean|null> => {
    const body = JSON.stringify({
        front: card.front,
        back: card.back,
    })
    try{
        const res = await fetch(base_url+'/'+card.id, {
            method: 'PATCH',
             headers: {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer '+ token
            },
            body
        });

        if(!res.ok) throw new Error(await res.text());
        const json = await res.json();
        return true;
    } catch(err){
        console.log('Failed to update card: ', err);
        return false;
        
    }
}