import { NEW_CARDS_PER_SESSION, REVIEW_COOLDOWN } from "shared/const/values";
import { shuffleArray } from "./common";
import { Card, Progress , ProgressMap, Session } from "types";

interface props{
    q: number;
    n: number;
    i: number;
    ef: number;
}
export const updateCard = ({q, n=0, i=0, ef=2.5}: props)=>{
    const progress={
        i: i,
        n: n,
        ef: ef,
        due_date: new Date(),
        reviewed_at: new Date()
    }

    if(q>=1){
        switch(n){
            case 0:
                progress.i=1;
                break;
            case 1:
                progress.i=6;
                break;
            default:
                progress.i= Math.round(i*ef)
                break;
        }

        let efChange = 0.1;
        if(q==1) efChange=-0.14;

        progress.ef=Math.max(1.3, Math.round((ef+efChange)*100)/100);
        progress.n++;
    }else{
        progress.n=0;
        progress.i=1;
        progress.ef=Math.max(1.3, Math.round((ef-0.2)*100)/100)
        
    }
    progress.due_date =new Date(Date.now() + (progress.i*24*60*60*1000));

    return progress;
}


export const cardsForReview= (cards: Card[], progress: ProgressMap|null)=> {
    if(!progress){
        const processed =shuffleArray(cards).slice(0,NEW_CARDS_PER_SESSION);
        
        return processed;
    }

    const pastDue = cards.filter(card=>{
        const cardProgress = progress[card.id];
        return cardProgress?.i > 0 && (cardProgress.due_date <= new Date());
    });
    let newCards = cards.filter(card=>{
        const cardProgress = progress[card.id];
        return cardProgress?.i == 0 || Object.keys(progress).includes(card.id) == false;
    });

    if (newCards.length > NEW_CARDS_PER_SESSION) {
        newCards = shuffleArray(newCards).slice(0, NEW_CARDS_PER_SESSION);
    }

    const total = pastDue.length +  Math.min(NEW_CARDS_PER_SESSION, newCards.length);

    return shuffleArray([...pastDue, ...newCards]);
}

export const readyForReview = (date: Date) =>{
    const today = Date.now();
    const lastReviewed = date.getTime();
    const diff = today - lastReviewed;
    

    return diff > REVIEW_COOLDOWN;

}


export const countNewCards = (progress: ProgressMap, cards: Card[]) => {
    const keys = Object.keys(progress);
    return cards.filter(card=>!keys.includes(card.id)).length
}
export const countReviewedCards = (progress: ProgressMap) => {
    const keys = Object.keys(progress);
    return keys.filter(key=>progress[key].i>0 && progress[key].n<5).length
}

export const countMasteredCards = (progress: ProgressMap) => {
    const keys = Object.keys(progress);

    return keys.filter(key=>progress[key].n>=5).length
}

export const getReviewedCardsCount = (session: Session | null) => {
    if (!session) return 0;
    return session.wrong + session.good + session.perfect;
}

export const getLastReviewed = (progress: ProgressMap | null) => {
    if (!progress) return null;
    return Object.values(progress).map(p => p.reviewed_at).sort((a, b) => b.getTime() - a.getTime())[0];
}
