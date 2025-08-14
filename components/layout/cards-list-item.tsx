import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import AppTheme from '../../shared/const/app-theme';
import { daysLeft, formatMS } from "shared/utils/common";
import { Card, Progress } from "types";
import { useEffect } from "react";
import { AuthStore } from "shared/stores/auth";
import useDecks from "shared/hooks/decks";

interface props {
    card: Card;
    progress: Progress|null;
    onTap: (card: Card)=>void;
}

export const CardsListItem = ({card, onTap, progress}: props) => {

    const msForDue = progress ?progress?.due_date.getTime()-Date.now() : null;

    const {user} = AuthStore();
    const { currentDeck} = useDecks();
    return(
    <View key={card.id} className={`p-5 flex w-full flex-row gap-5 justify-between items-center border bg-white rounded-lg border-gray-200`}>
            <View className="flex-1">
                <Text className="text-md font-semibold">{card.front}</Text>
                <Text className="text-gray-600">{card.back}</Text>
            </View>
            <View className="flex flex-row grow gap-5 items-center justify-end">
                <Text className="text-gray-400">{msForDue ? msForDue>0 ? 'Review in '+formatMS(msForDue) : 'Ready for review' : 'Not reviewed yet'}</Text>
                <TouchableOpacity onPress={()=>onTap(card)}>
                    <Ionicons name="ellipsis-vertical" size={24}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}