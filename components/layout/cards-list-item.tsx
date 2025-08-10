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
    selected?: boolean;
    selecting?: boolean;
    onTap: (card: Card)=>void;
}

export const CardsListItem = ({card, selected=false, selecting = false, onTap, progress}: props) => {

    const msForDue = progress ?progress?.due_date.getTime()-Date.now() : null;

    const {user} = AuthStore();
    const { currentDeck} = useDecks();
    if(card.front=='Forse') console.log('due date: ', progress?.due_date.toISOString());
    return(
        <Pressable onPress={()=>onTap(card)}>
            <View key={card.id} className={`p-5 flex w-full flex-row gap-5 justify-between items-center border bg-white rounded-lg ${selected ? 'border-primary-500 border-2' : 'border-gray-300'}`}>
                <View className="flex-1">
                    <Text className="text-md font-semibold">{card.front}</Text>
                    <Text className="text-gray-600">{card.back}</Text>
                </View>
                <View className="flex flex-row grow gap-5 items-center justify-end">
                    <Text className="text-gray-400">{msForDue ? msForDue>0 ? 'Review in '+formatMS(msForDue) : 'Ready for review' : 'Not reviewed yet'}</Text>
                    <TouchableOpacity onPress={()=>onTap(card)}>
                        {currentDeck?.user_id == user?.id ?
                        !selecting ?
                            <Ionicons name="ellipsis-vertical" size={24}/>
                        : selected ?
                            <Ionicons name="checkmark-circle-outline" size={32} color={AppTheme.color.primary['500']}/>
                        :
                            <Ionicons name="checkmark-circle-outline" size={32}/>
                        : null
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </Pressable>
    )
}