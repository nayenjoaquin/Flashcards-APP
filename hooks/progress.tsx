import { API_BASE_URL } from "shared/const/strings"
import { AuthStore } from "shared/stores/auth"
import { progressStore } from "shared/stores/progress"
import { getLocal } from "shared/utils/common"
import { Card, DeckProgress, Progress, ProgressItem } from "types"

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
            
            let newProgress: Progress = {};

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
            setProgress({
                progress: newProgress,
                lastReviewed
            })
            
        }catch(err){
            setProgress(null);
            
        }
    }

    const updateCardProgress = async (card_id: string, progress: ProgressItem) => {
        
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
            
            console.error('Failed to save progress: ',progress, err);
        }
    }

    const saveProgress = async(deck_id: string, progress: Progress) => {
        console.log('UPDATING PROGRESS: ', progress);
        
        const cardIds = Object.keys(progress);

        cardIds.forEach(async(id)=>{
            const success = await updateCardProgress(id, progress[id]);
        });

        getProgress(deck_id)
    }

    return {getProgress, progress, saveProgress}
}