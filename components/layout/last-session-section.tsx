import useDecks from "shared/hooks/decks";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getLocal, timeAgo } from "shared/utils/common";
import { DeckCard } from "./deck-card";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/navigation";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FilledButton } from "components/buttons/filled-button";
import appTheme from "shared/const/app-theme";
import { getReviewedCardsCount } from "shared/utils/spaced-repetition";
import { Deck, Session } from "types";
import { useAuth } from "shared/hooks/auth";
import { useSession } from "shared/hooks/last-session";

type navProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export const LastSessionSection = () => {
    const [lastDeck, setLastDeck] = useState<Deck | null>(null);
    const {lastSession, getLastSession, setLastSession} = useSession();
    const {getDeckById} = useDecks();
    const navigation = useNavigation<navProp>();
    const {user} = useAuth();

    useEffect(() => {
        
        getLastSession(user?.token).then((session) => {
            if (session) {
                setLastSession(session);
                getDeckById(session.deck_id).then((deck) => {
                    setLastDeck(deck);
                });
            }
        });
    }, [user]);
    if(!lastSession){
        return null
    }
    return(
        <View className="flexjustify-center items-start gap-2.5 ">
            <Text className="text-2xl font-semibold">Last session</Text>
            { lastDeck ? (
                <View className="flex w-full flex-row items-center gap-2.5 rounded-2xl ">
                    <DeckCard deck={lastDeck} onPressed={()=>{
                        navigation.navigate('Deck', { deck: lastDeck });
                    }}
                    index={2}
                    />
                    <View className="flex-1 flex-col justify-center items-start gap-2.5">
                        <View className="flex flex-row items-center gap-2">
                            <Text className="text-xl italic text-gray-400 flex flex-row">{timeAgo(lastSession.created_at)}</Text>
                            <Ionicons  name="time-outline" size={16} color={"#9CA3AF"}/>
                        </View>
                        <Text className="text-xl">{getReviewedCardsCount(lastSession)} cards reviewed</Text>
                        <Text className="text-xl">Wrong: {lastSession?.wrong??0} </Text>
                        <Text className="text-xl">Good: {lastSession?.good??0}</Text>
                        <Text className="text-xl">Perfect: {lastSession?.perfect??0}</Text>
                        <FilledButton
                            text="Review deck"
                            color={appTheme.color.primary[500]}
                            onPress={()=>{
                                navigation.navigate('Deck', {deck: lastDeck});
                            }}
                            />

                    </View>
                </View>
            ) : (
                <Text className="text-white">No decks reviewed yet</Text>
            )}
        </View>
    )
}