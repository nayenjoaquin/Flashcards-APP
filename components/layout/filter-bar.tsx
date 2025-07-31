import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import appTheme from "shared/const/app-theme";

export type filter = {
    name: string;
    onApply: ()=>void;
    onRemove: ()=>void;
}

interface props{
    filters: filter[];
}

export const FilterBar = ({filters}: props) => {
    const [active, setActive] = useState(false);
    return(
        <ScrollView className="w-full" horizontal>
            <View className=" px-5 flex flex-row gap-5 items-center">
                {
                    filters.map(filter=>{
                        return(
                            <TouchableOpacity key={filter.name} onPress={()=>{
                                if(active){
                                    filter.onRemove();
                                }else{
                                    filter.onApply();
                                }
                                setActive(prev=>!prev)
                            }}>
                                <Text style={{
                                    backgroundColor: !active ? `${appTheme.color.primary[500]}80`: appTheme.color.primary[500]
                                }} className='p-2.5 rounded-full text-white font-semibold'>
                                    {filter.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}