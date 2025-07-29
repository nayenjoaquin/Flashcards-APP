import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DeckCard } from "components/layout/deck-card";
import { DeckTile } from "components/layout/deck-tile";
import { LastSessionSection } from "components/layout/last-session-section";
import { useAuth } from "shared/hooks/auth";
import useDecks from "shared/hooks/decks";
import { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native"
import { RootStackParamList } from "types/navigation";
import { ForReviewSection } from "components/layout/for-review-section";
import { cardsForReview } from "shared/utils/spaced-repetition";

type navProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export const HomeScreen = () => {

    const {savedDecks, loading: loadingDecks, getSavedDecks, getDeckById} = useDecks();
    const navigation = useNavigation<navProp>();

    useEffect(()=>{
        getSavedDecks();
    },[])
    
    return(
        <View className="p-5">
            <SafeAreaView className="flex w-full h-full items-center justify-center gap-5">
                <ScrollView className="w-full">
                    <View className="flex w-full justify-center items-start gap-10">
                        {/* saved decks scroll bar */}
                        <View className="flex w-full justify-center items-start gap-2.5">
                            <Text className="text-2xl font-semibold">Your saved decks</Text>
                            <ScrollView horizontal className="bg w-full">
                                <View className=" flex flex-row items-center gap-5">
                                    {loadingDecks ? (
                                        <Text className="text-white">Loading...</Text>
                                    ): (
                                        savedDecks.map((deck) => (
                                                <DeckTile onTap={()=>{
                                                    navigation.navigate('Deck', { deck });
                                                }} deck={deck} key={deck.id}/>
                                        ))
                                    )}
                                </View>
                            </ScrollView>
                        </View>
                        <LastSessionSection/>
                        <ForReviewSection savedDecks={savedDecks.filter(deck => cardsForReview(deck.cards, deck.progress).length > 0)} />
                    </View>
            </ScrollView>
        </SafeAreaView>
    </View>
    );
}