import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { countMasteredCards, countNewCards, countReviewedCards, DEFAULT_PROGRESS } from "utils/functions";

interface props{
    progress: Record<string, progress>;

}

export const DeckProgressBoard = ({progress}: props) => {
    return(
        <View className="flex flex-row w-full justify-between gap-5 mt-5">
            <View className="flex items-center w-20">
                <Text className="font-semibold">
                {countNewCards(progress)}
                </Text>
                <View className="flex flex-row items-center gap-0.5">
                    <Text className="text-sm font-semibold flex">
                        New
                    </Text>
                    <Ionicons name="albums" color='#a1a8d8' size={16}/>
                </View>
            </View>
            <View className="flex items-center w-20">
                <Text className="font-semibold">
                {countReviewedCards(progress)}
                </Text>
                <View className="flex flex-row items-center gap-0.5">
                    <Text className="text-sm font-semibold flex">
                        Reviewed
                    </Text>
                    <Ionicons name="checkmark-circle" color='#109010' size={16}/>
                </View>
            </View>
            <View className="flex items-center w-20">
                <Text className="font-semibold">
                {countMasteredCards(progress)}
                </Text>
                <View className="flex flex-row items-center gap-0.5">
                    <Text className="text-sm font-semibold flex">
                        Mastered
                    </Text>
                    <Ionicons name="checkmark-circle" color='blue' size={16}/>
                </View>
            </View>
            </View>
    )
}