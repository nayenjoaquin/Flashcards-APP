import { Key, useId, useRef, useState } from "react";
import { Animated, Pressable, SafeAreaView, Text, View } from "react-native"
import { Card } from "types";

interface props {
    card: Card;
    onNext: ()=>void;
    flipped: boolean;
    onFlip: ()=> void
}

export const FlashCard = ({card, onNext, flipped, onFlip}: props) =>{

    const handlePress=()=>{
        if(flipped){
            return
        }
        onFlip();

    }
    
    return(
        <Pressable onPress={handlePress}>
            <View style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 2,
                    elevation: 5,
                }} className={`w-full  aspect-[9/16] flex items-center rounded-2xl justify-center bg-secondary-500 `}>
                {
                    flipped ?
                    <View className="flex items-center w-full p-5 gap-5">
                        <Text className="font-bold text-2xl text-white">
                        {card.front}
                        </Text>
                        <View className="w-full border border-secondary-400"/>
                        <Text className="font-bold text-2xl text-white">
                            {card.back}
                        </Text>
                    </View>
                    :
                    <Text className="font-bold text-2xl text-white">
                        {card.front}
                    </Text>
                }
            </View>
        </Pressable>
    )
}