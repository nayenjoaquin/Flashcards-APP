import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface props {
    label: string;
    inverted?: boolean;
    onChange: (value: boolean)=>void;
    initial?: boolean;
}

export const LabeledCheckBox = ({label, inverted, onChange, initial=false}: props) => {
    const [checked, setChecked] = useState(initial);
    return(
        <View className="flex flex-row items-center gap-2.5">
            <Text>
                {label}
            </Text>
            <Pressable onPress={()=>{
                setChecked(prev=>{
                    onChange(!prev);
                    return !prev;
                })
            }} className="aspect-square h-6 border border-gray-300 flex justify-center items-center">
                {checked ?
                <Ionicons name="checkbox" size={20} color={'#ff9500'}/>
                : null
                }
            </Pressable>
        </View>
    )
}