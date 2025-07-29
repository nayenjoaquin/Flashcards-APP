import { API_BASE_URL } from "shared/const/strings";
import { NewCard } from "types";
import { json2Card } from "./schemas";

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