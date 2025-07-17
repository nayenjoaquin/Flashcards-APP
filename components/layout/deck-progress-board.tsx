import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { countMasteredCards, countNewCards, countReviewedCards } from "shared/utils/spaced-repetition";
import { Card, ProgressMap } from "types";

interface props{
    progress: ProgressMap | null;
    cards: Card[];

}

export const DeckProgressBoard = ({progress, cards}: props) => {
    
    
    return(
        <View className="flex flex-row w-full justify-between gap-5 mt-5">
            <View className="flex items-center w-20">
                <Text className="font-semibold">
                {progress ?countNewCards(progress, cards) : cards.length}
                </Text>
                <View className="flex flex-row items-center gap-0.5">
                    <Text className="text-sm font-semibold flex">
                        New
                    </Text>
                    <Ionicons name="albums" color='#a1a8d8' size={16}/>
                </View>
            </View>
            <View className="h-full border-l border-gray-400"></View>
            <View className="flex items-center w-20">
                <Text className="font-semibold">
                {progress ? countReviewedCards(progress) : 0}
                </Text>
                <View className="flex flex-row items-center gap-0.5">
                    <Text className="text-sm font-semibold flex">
                        Reviewed
                    </Text>
                    <Ionicons name="checkmark-circle" color='#109010' size={16}/>
                </View>
            </View>
            <View className="h-full border-l border-gray-400"></View>
            <View className="flex items-center w-20">
                <Text className="font-semibold">
                {progress ? countMasteredCards(progress) : 0}
                </Text>
                <View className="flex flex-row items-center gap-0.5">
                    <Text className="text-sm font-semibold flex">
                        Mastered
                    </Text>
                    <Ionicons name="checkmark-done-circle" color='blue' size={16}/>
                </View>
            </View>
            </View>
    )
}