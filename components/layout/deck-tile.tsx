import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { gradient2Colors } from "shared/utils/common";
import newGradient from 'random-gradient';
import { LinearGradient } from "expo-linear-gradient";
import { Deck } from "types";

interface props {
    deck: Deck;
    onTap: ()=> void;
}

export const DeckTile = ({ deck, onTap }: props) => {

const gradient = gradient2Colors(newGradient(deck.id)) as [string, string, ...string[]];
    return (
        <TouchableOpacity onPress={onTap}>
            <View className="bg-white rounded-lg p-2.5 flex flex-row  gap-2.5 max-h-20">
                <View>
                    <LinearGradient
                        colors={gradient}
                        style={{
                            height: '100%',
                            aspectRatio: 1,
                            opacity: .8
                        }}
                    />
                </View>
                <View>
                    <Text className="text-lg font-semibold">{deck.name}</Text>
                    <Text className="text-gray-500">{deck.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}