import { json2Deck } from "shared/api/schemas"
import { API_BASE_URL } from "shared/const/strings"
import { AuthStore } from "shared/stores/auth"
import { getLocal } from "shared/utils/common"
import { Card, Deck, Progress, ProgressMap } from "types"

export const useProgress = () =>{

    const saveCardProgress = async (deck: Deck, card_id: string, progress: Progress) => {
        const body = JSON.stringify({
            i: progress.i,
            n: progress.n,
            ef: progress.ef,
            due_date: progress.due_date.toISOString()
        })
        
        

        try{
            const res = await fetch(API_BASE_URL+'/progress/'+card_id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": "Bearer "+ await getLocal('JWT')
                },
                body: body
            });
            if(!res.ok){
                throw new Error(await res.text());
            }
            return true;
        }catch(err){
            
            console.log('Failed to save progress: ',progress, err);
        }
    }

    const saveProgress = async(deck: Deck, progress: ProgressMap): Promise<Deck|null> => {
        

        if(!deck.progress){
            deck.progress = progress;
        }

        const cardIds = Object.keys(progress);

        cardIds.forEach(async(id)=>{
            const success = await saveCardProgress(deck, id, progress[id]);
            if(success){
                deck.progress![id] = progress[id];
            }else{
                return null;
            }
        });
        
        return deck;
    }

    return {saveProgress}
}