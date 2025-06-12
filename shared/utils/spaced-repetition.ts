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
        dueDate: new Date()
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
    progress.dueDate = new Date(progress.dueDate.getTime() + (progress.i*86400000));

    return progress;
}

export const DEFAULT_PROGRESS =(cards: Card[])=>{
    const progress = cards.reduce((acc, card)=>{
        acc[card.id] = {
            n: 0,
            i: 0,
            ef: 2.5,
            dueDate: new Date()
        }
        return acc;
    }, {} as Record<string, progress>);
    return progress
    
}

export const cardsForReview= (cards: Card[], progress: Record<string, progress>)=>{

    const keys = Object.keys(progress) as (keyof typeof progress)[];
    const now = new Date();

    const pastDueCount = keys
    .map(key => progress[key].dueDate)
    .filter(dueDate => dueDate <= now).length;

    const newCards = countNewCards(progress, cards);

    return pastDueCount + Math.min(20, newCards);

}


export const countNewCards = (progress: Record<string, progress>, cards: Card[]) => {
    const keys = Object.keys(progress);

    return cards.filter(card=>!keys.includes(card.id)||progress[card.id].i==0).length
}
export const countReviewedCards = (progress: Record<string, progress>, cards: Card[]) => {
    const keys = Object.keys(progress);

    return cards.filter(card=>keys.includes(card.id)&&progress[card.id].i>0 && progress[card.id].n<5).length
}

export const countMasteredCards = (progress: Record<string, progress>, cards: Card[]) => {
    const keys = Object.keys(progress);

    return cards.filter(card=>keys.includes(card.id)&&progress[card.id].n>=5).length
}