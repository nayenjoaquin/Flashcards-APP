import { useRef, useState } from "react";
import { Animated, Pressable, SafeAreaView, Text, View } from "react-native"

interface props {
    card: Card;
    next: ()=>void;
}

export const FlashCard = ({card, next}: props) =>{
    const flipAnim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);
  const flipCard = () => {
    setFlipped(prev=>!prev);

    if (flipped) next();
  };
    return(
        <Pressable onPress={flipCard}>
            <View className={`w-full aspect-[9/16] flex items-center rounded-2xl justify-center bg-${flipped ? 'indigo' : 'blue'}-500`}>
                {
                    flipped ?
                    <Text className="font-bold text-2xl text-white">
                        {card.back}
                    </Text>
                    :
                    <Text className="font-bold text-2xl text-white">
                        {card.front}
                    </Text>
                }
            </View>
        </Pressable>
    )
}