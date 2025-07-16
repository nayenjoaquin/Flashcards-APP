import { API_BASE_URL } from "shared/const/strings"
import { AuthStore } from "shared/stores/auth"
import { progressStore } from "shared/stores/progress"
import { getLocal } from "shared/utils/common"
import { Card, DeckProgress, Progress, ProgressMap } from "types"

export const useProgress = () =>{

    const {progress, setProgress} = progressStore();

    const getProgress = async(deck_id: string) => {

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
            if(body.length == 0){
                throw new Error('No progress retrieved from api');
            }
            
            let newProgress: ProgressMap = {};

            body.forEach(item=>{
                const {card_id, ...progress} = item
                newProgress[item.card_id] = {
                    ...progress,
                    due_date: new Date(item.due_date),
                    reviewed_at: new Date(item.reviewed_at)
                }
            })
            const reviewDates = body.map(item=>new Date(item.reviewed_at));
            const lastReviewed = new Date(Math.max(...reviewDates.map(date=>date.getTime())));
            const deckProgress: DeckProgress = {
                progress: newProgress,
                lastReviewed
            }
            setProgress(deckProgress);
            return deckProgress;
            
        }catch(err){
            setProgress(null);
            return null;
            console.log('Failed to get progress: ', err);
            
            
        }
    }

    const updateCardProgress = async (card_id: string, progress: Progress) => {
        
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

    const saveProgress = async(deck_id: string, progress: ProgressMap) => {
        
        const cardIds = Object.keys(progress);

        cardIds.forEach(async(id)=>{
            const success = await updateCardProgress(id, progress[id]);
        });

        setProgress({
            progress,
            lastReviewed: new Date()
        })
    }

    return {getProgress, progress, saveProgress}
}