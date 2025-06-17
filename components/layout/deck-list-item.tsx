import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface props {
    deck: Deck;
    onTap: ()=> void;
    saved?: boolean;
}
export const DeckListItem = ({deck, onTap, saved}: props) => {
    
    return (
        <TouchableOpacity
            onPress={onTap}
            className="flex w-full flex-row items-center justify-between p-2.5 bg-white"
        >
            <View className="flex-1">
                <Text className="text-lg font-semibold">{deck.name}</Text>
                <Text className="text-sm text-gray-500">{deck.description}</Text>
            </View>
            {saved && (
                <Ionicons name="heart" size={24} color="#8a8eca" />
            )}
        </TouchableOpacity>
    );
}