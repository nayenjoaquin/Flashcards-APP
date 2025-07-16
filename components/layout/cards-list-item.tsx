import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import AppTheme from '../../shared/const/app-theme';
import { progressStore } from "shared/stores/progress";
import { daysLeft } from "shared/utils/common";
import { Card } from "types";
import { useEffect } from "react";

interface props {
    card: Card;
    selected?: boolean;
    selecting?: boolean;
    onTap: ()=>void;
}

export const CardsListItem = ({card, selected=false, selecting = false, onTap}: props) => {

    const {progress} = progressStore();
    const reviewIn = !progress ? 0 : progress.progress[card.id] ? daysLeft(progress.progress[card.id].due_date) : 0
    return(
        <View key={card.id} className={`p-5 flex w-full flex-row gap-5 justify-between items-center border bg-white rounded-lg ${selected ? 'border-primary-500 border-2' : 'border-gray-300'}`}>
            <View className="flex-1">
                <Text className="text-md font-semibold">{card.front}</Text>
                <Text className="text-gray-600">{card.back}</Text>
            </View>
            <View className="flex flex-row grow gap-5 items-center justify-end">
                <Text className="text-gray-400">Review in {reviewIn>=0 ? reviewIn : 0} days</Text>
                <TouchableOpacity onPress={onTap}>
                    {!selecting ?
                        <Ionicons name="ellipsis-vertical" size={24}/>
                    : selected ?
                        <Ionicons name="checkmark-circle-outline" size={32} color={AppTheme.primary['500']}/>
                    :
                        <Ionicons name="checkmark-circle-outline" size={32}/>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}