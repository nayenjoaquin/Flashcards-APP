import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DeckCard } from "components/layout/deck-card";
import { DeckTile } from "components/layout/deck-tile";
import { LastSessionSection } from "components/layout/last-session-section";
import useDecks from "hooks/decks";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native"
import { getLocal } from "shared/utils/common";
import { RootStackParamList } from "types/navigation";

type navProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export const HomeScreen = () => {

    const {decks, myDecks, loading: loadingDecks, error, getSavedDecks, getDeckbyId} = useDecks();
    const [lastDeck, setLastDeck] = useState<Deck | null>(null);
    const [lastSession, setLastSession] = useState<Session | null>(null);
    const navigation = useNavigation<navProp>();

    useEffect(()=>{
        getSavedDecks();
        getLocal('LAST_SESSION').then((session: Session | null)=>{
            if(session){
                setLastSession(session);
                getDeckbyId(session.deckId).then((deck)=>{
                    setLastDeck(deck);
                });
            }
        });
    }, [])
    return(
        <View className="p-5">
            <SafeAreaView className="flex w-full h-full items-center justify-center gap-5">
                <View className="flex w-full justify-center items-start gap-2.5">
                    <Text className="text-2xl font-semibold">Your saved decks</Text>
                    <ScrollView horizontal className="bg w-full">
                        <View className=" flex flex-row items-center gap-5">
                            {loadingDecks ? (
                                <Text className="text-white">Loading...</Text>
                            ) : error ? (
                                <Text className="text-red-500">{error}</Text>
                            ) : (
                                myDecks.map((deck) => (
                                        <DeckTile onTap={()=>{
                                            navigation.navigate('Deck', { deck });
                                        }} deck={deck} key={deck.id}/>
                                ))
                            )}
                        </View>
                    </ScrollView>
                </View>
                <LastSessionSection />
            </SafeAreaView>
        </View>
    )
}