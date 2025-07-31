import AsyncStorage from "@react-native-async-storage/async-storage";
export const gradient2Colors =(gradient: string)=>{
    let colors = gradient.split(',').slice(-2);
    return [colors[0].slice(1), colors[1].slice(1, -1)]
}

export const saveLocal = async (name: string, item: Object) => {
    
    try{
        await AsyncStorage.setItem(name, JSON.stringify(item));
         if (item==null){
            throw new Error('Failed to save Item');
        }
        return item

    }catch(err){
        return null   
    }
}

export const getLocal = async (name: string) => {
    try{
        const item = await AsyncStorage.getItem(name);
        
        if (item==null){
            throw new Error('Item not found');
        }
        
        return await JSON.parse(item);
    }catch(err:any){
        return null
        
    }
}

export const removeLocaL = async (name: string)=>{
    try{
        await AsyncStorage.removeItem(name, ()=>{
        });
    } catch(err){
        
    }
}

export const  daysLeft =(dueDate: Date) => {
  
  const today = new Date();
  

  // Reset time to midnight for both dates
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

export const timeAgo = (pastDate: number): string => {
  console.log('parsing date: ', pastDate);
  
  const now = Date.now();
  const diff = now-pastDate;
  if(diff<1000){
    return 'just now'
  }else if(diff<1000*60){
    const seconds = Math.round(diff/1000)
    return seconds + ' seconds ago'
  }else if(diff<1000*60*60){
     const minutes = Math.round(diff/(1000*60))
    return minutes + ' minutes ago'
  }else if(diff<1000*60*60*24){
     const hours = Math.round(diff/(1000*60*60))
     
    return hours + ' hours ago'
  }else{
     const days = Math.round(diff/(1000*60*60*24))
    return days + ' days ago'
  }
}


export const formatSavedCount = (count: number) => {
  if (count < 1000) {
    return count.toString();
  } else if (count < 1000000) {
    return (count / 1000).toFixed(1) + 'K';
  } else {
    return (count / 1000000).toFixed(1) + 'M';
  }
}
export function shuffleArray<T>(array: T[]): T[] {

  const shuffled = [...array]; // Copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
  }
  return shuffled;
}