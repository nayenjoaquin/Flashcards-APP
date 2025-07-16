import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { gradient2Colors } from "shared/utils/common";
import newGradient from 'random-gradient';
import { LinearGradient } from "expo-linear-gradient";
import { Deck } from "types";
import { cardsForReview } from "shared/utils/spaced-repetition";
import { useEffect, useState } from "react";
import { useProgress } from "shared/hooks/progress";
import useCards from "shared/hooks/flashcards";
import { useSession } from "shared/hooks/last-session";

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
                <View className="flex flex-col justify-center items-start gap-2.5">
                    <Text className="text-lg font-semibold">{deck.name}</Text>
                    <Text className="text-gray-500">Cards for review:  {cardsForReview(deck.cards, deck.progress).length}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}