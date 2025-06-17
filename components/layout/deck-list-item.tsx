import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

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
            className="flex w-full flex-row items-center justify-between p-2.5 bg-white"
        >
            <View className="flex-1">
                <Text className="text-lg font-semibold">{deck.name}</Text>
                <Text className="text-md text-gray-500">{deck.description}</Text>
                <Text className="text-sm text-gray-400 italic">created by {deck.owner}</Text>
            </View>
            {saved ? 
                <Pressable onPress={() => onRemove(deck)}>
                    <Ionicons name="bookmark" size={24} color="#8a8eca" />
                </Pressable>
             : 
                <Pressable onPress={() => onSave(deck)}>
                    <Ionicons name="bookmark-outline" size={24} color="#8a8eca" />
                </Pressable>
            }
        </TouchableOpacity>
    );
}