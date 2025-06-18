import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { formatSavedCount } from "shared/utils/common";
import { Deck } from "types";

interface props {
    deck: Deck;
    onTap: ()=> void;
    saved?: boolean;
    onSave: (deck: Deck) => void;
    onRemove: (deck: Deck) => void;
}
export const DeckListItem = ({deck, onTap, saved, onSave, onRemove}: props) => {

    return (
        <TouchableOpacity
            onPress={onTap}
            className="flex w-full flex-row items-center justify-between p-2.5 bg-white border border-gray-200 rounded-lg"
        >
            <View className="flex-1">
                <Text className="text-lg font-semibold">{deck.name}</Text>
                <Text className="text-md text-gray-500">{deck.description}</Text>
            </View>

            <View className="flex flex-row items-center gap-2.5">
                <Pressable onPress={saved ? () => onRemove(deck) : () => onSave(deck)}>
                    { saved ?
                        <Ionicons name="bookmark" size={24} color="#8a8eca" />
                        :
                        <Ionicons name="bookmark-outline" size={24} color="#8a8eca" />
                    }
                </Pressable>
                <Text className="text-sm text-secondary-500">{formatSavedCount(deck.saved)}</Text>
            </View>
        </TouchableOpacity>
    );
}