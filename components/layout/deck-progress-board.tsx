import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { countMasteredCards, countNewCards, countReviewedCards, DEFAULT_PROGRESS } from "shared/utils/spaced-repetition";

interface props{
    progress: Record<string, progress>;
    cards: Card[];
}

export const DeckProgressBoard = ({progress, cards}: props) => {

    const reviewed = countReviewedCards(progress);
    const mastered = countMasteredCards(progress);
    const newCards = cards.length-reviewed - mastered;
    return(
        <View className="flex flex-row w-full justify-between gap-5 mt-5">
            <View className="flex items-center w-20">
                <Text className="font-semibold">
                {newCards}
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
                {reviewed}
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
                {mastered}
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