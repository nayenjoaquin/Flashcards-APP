import { API_BASE_URL } from "shared/const/strings"
import { AuthStore } from "shared/stores/auth"
import { progressStore } from "shared/stores/progress"
import { getLocal } from "shared/utils/common"
import { DEFAULT_PROGRESS } from "shared/utils/spaced-repetition"
import { Card, DeckProgress, Progress, ProgressItem } from "types"

export const useProgress = () =>{

    const {progress, setProgress} = progressStore();

    const getProgress = async(deck_id: string, cards: Card[]):Promise<Progress | null> => {

        try{
            const res = await fetch(API_BASE_URL+'/progress/'+deck_id, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '+ await getLocal('JWT')
                }
            });

            if(!res.ok){
                const errorText = await res.text()
                throw new Error(errorText);
            }

            type bodyType ={
                card_id: string;
                i: number;
                n: number;
                ef: number;
                due_date: string;
                reviewed_at: string;
            }

            const body = await res.json() as bodyType[]
            
            
            let newProgress: Progress = {};

            body.forEach(item=>{
                const {card_id, ...progress} = item
                newProgress[item.card_id] = {
                    ...progress,
                    due_date: new Date(item.due_date),
                    reviewed_at: new Date(item.reviewed_at)
                }
            })

            return newProgress
            
        }catch(err){
            console.error('Failed fetching deck progress: ',err);
            return null
            
        }
    }

    return {getProgress, progress, setProgress}
}