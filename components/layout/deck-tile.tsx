import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { gradient2Colors } from "shared/utils/common";
import newGradient from 'random-gradient';
import { LinearGradient } from "expo-linear-gradient";
import { Deck } from "types";
import { cardsForReview } from "shared/utils/spaced-repetition";

interface props {
    deck: Deck;
    onTap: ()=> void;
}

export const DeckTile = ({ deck, onTap }: props) => {
const gradient = gradient2Colors(newGradient(deck.id)) as [string, string, ...string[]];
    return (
        <TouchableOpacity onPress={onTap}>
            <View className="bg-white rounded-lg p-2.5 flex flex-row  gap-2.5 max-h-20">
                <View className="h-full aspect-square">
                    {
                        deck.img?
                        <Image src={deck.img} className="w-full h-full object-cover"/>
                        :
                        <LinearGradient className="w-full h-full" colors={gradient}/>
                    }
                    
                </View>
                <View className="flex flex-col justify-center items-start gap-2.5">
                    <Text className="text-lg font-semibold">{deck.name}</Text>
                    <Text className="text-gray-500">Cards for review:  {cardsForReview(deck).length}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}