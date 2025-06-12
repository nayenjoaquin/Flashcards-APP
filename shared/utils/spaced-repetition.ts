import { NEW_CARDS_PER_SESSION } from "shared/const/values";

interface props{
    q: number;
    n: number;
    i: number;
    ef: number;
}
export const updateCard = ({q, n, i, ef}: props)=>{
    const progress={
        i: i,
        n: n,
        ef: ef,
        dueDate: Date.now()
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
    progress.dueDate = Date.now() + (progress.i*86400000);

    return progress;
}

export const DEFAULT_PROGRESS =(cards: Card[])=>{
    const progress = cards.reduce((acc, card)=>{
        acc[card.id] = {
            n: 0,
            i: 0,
            ef: 2.5,
            dueDate: Date.now()
        }
        return acc;
    }, {} as Record<string, progress>);
    return progress
    
}

export const cardsForReview= (progress: Record<string, progress>)=>{

    const keys = Object.keys(progress) as (keyof typeof progress)[];

    const pastDueCount = keys.filter(key=>progress[key].dueDate<Date.now()&&progress[key].i!=0).length;
    const newCards = countNewCards(progress);

    return pastDueCount + Math.min(NEW_CARDS_PER_SESSION, newCards);

}


export const countNewCards = (progress: Record<string, progress>) => {
    const keys = Object.keys(progress);

    return keys.filter(key=>progress[key].i==0).length
}
export const countReviewedCards = (progress: Record<string, progress>) => {
    const keys = Object.keys(progress);

    return keys.filter(key=>progress[key].i>0 && progress[key].n<5).length
}

export const countMasteredCards = (progress: Record<string, progress>) => {
    const keys = Object.keys(progress);

    return keys.filter(key=>progress[key].n>=5).length
}