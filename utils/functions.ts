import AsyncStorage from "@react-native-async-storage/async-storage";
import { RectButtonWithRefProps } from "react-native-gesture-handler/lib/typescript/components/GestureButtonsProps";

export const gradient2Colors =(gradient: string)=>{
    let colors = gradient.split(',').slice(-2);
    return [colors[0].slice(1), colors[1].slice(1, -1)]
}

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

export const saveDeckProgress = async (progress: Record<string,progress>, deck_id: string) => {
    try{
        await AsyncStorage.setItem(deck_id, JSON.stringify(progress));
        console.log('progress saved');
        
    }catch(err:any){
        console.error('Error saving object:',err);
        
    }
}

export const saveLocal = async (name: string, item: Object) => {
    
    try{
        await AsyncStorage.setItem(name, JSON.stringify(item));
         if (item==null){
            throw new Error('Failed to save Item');
        }
        console.log('Item saved succesfully');

    }catch(err){
        console.error(err);
        return null   
    }
}

export const getLocal = async (name: string) => {
    try{
        const item = await AsyncStorage.getItem(name);
        
        if (item==null){
            throw new Error('Item not found');
        }
        console.log('Item retrieved succesfully');
        
        return await JSON.parse(item);
    }catch(err:any){
        console.error(err);
        return null
        
    }
}

export const removeLocaL = async (name: string)=>{
    try{
        await AsyncStorage.removeItem(name, ()=>{
            console.log('Item removed succesfully');
        });
    } catch(err){
        console.error(err);
        
    }
}

export const getDeckProgress = async (deck_id: string) => {
    try{
        const progress = await AsyncStorage.getItem(deck_id);
        
        if (progress==null){
            throw new Error('Progress not found');
        }
        console.log('Progress retrieved succesfully');
        
        return await JSON.parse(progress) as Record<string, progress>;
    }catch(err:any){
        console.error(err);
        return null
        
    }
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

export const cardsForReview= (progress: Record<string, progress>)=>{

    const keys = Object.keys(progress) as (keyof typeof progress)[];
    const now = new Date();

    const pastDueCount = keys
    .map(key => progress[key].dueDate)
    .filter(dueDate => dueDate <= now).length;

    return pastDueCount;
}