import { API_BASE_URL } from "shared/const/strings"
import { AuthStore } from "shared/stores/auth"
import { progressStore } from "shared/stores/progress"
import { getLocal } from "shared/utils/common"
import { Card, Deck, Progress, ProgressMap } from "types"

export const useProgress = () =>{

    const saveCardProgress = async (deck: Deck, card_id: string, progress: Progress) => {

        try{
            const res = await fetch(API_BASE_URL+'/progress/'+card_id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": "Bearer "+ await getLocal('JWT')
                },
                body: JSON.stringify({
                    i: progress.i,
                    n: progress.n,
                    ef: progress.ef,
                    due_date: progress.due_date
                })
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

        const deckCopy = JSON.parse(JSON.stringify(deck)) as Deck;

        if(!deckCopy.progress){
            deckCopy.progress = progress;
        }

        const cardIds = Object.keys(progress);

        cardIds.forEach(async(id)=>{
            const success = await saveCardProgress(deckCopy, id, progress[id]);
            if(success){
                deckCopy.progress![id] = progress[id];
            }else{
                return null;
            }
        });

        return deckCopy;
    }

    return {saveProgress}
}