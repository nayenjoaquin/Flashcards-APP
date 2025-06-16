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
        console.log(name+' saved succesfully');

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
        console.log(name+' retrieved succesfully');
        
        return await JSON.parse(item);
    }catch(err:any){
        console.error(err);
        return null
        
    }
}

export const removeLocaL = async (name: string)=>{
    try{
        await AsyncStorage.removeItem(name, ()=>{
            console.log(name+' removed succesfully');
        });
    } catch(err){
        console.error(err);
        
    }
}

export const  daysLeft =(dueDate: number) => {
  const today = new Date();
  const date = new Date(dueDate);

  // Reset time to midnight for both dates
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

export const daysAgo = (pastDate: number) => {
  const today = new Date();
  const date = new Date(pastDate);

  // Reset time to midnight for both dates
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - date.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}