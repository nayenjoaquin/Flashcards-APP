import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import useDecks from "shared/hooks/decks";
import { formatSavedCount, gradient2Colors } from "shared/utils/common";
import { Deck } from "types";
import { RootStackParamList } from "types/navigation";
import newGradient from 'random-gradient';

interface props {
    deck: Deck;
}
type navigationProp = StackNavigationProp<RootStackParamList, 'Main'>
export const DeckListItem = ({deck}: props) => {

    const navigation = useNavigation<navigationProp>();
    const {savedDecks, saveDeck, removeSavedDeck} = useDecks();
    const [saved, setSaved] = useState(savedDecks.map(deck=>deck.id).includes(deck.id));
    const gradient = gradient2Colors(newGradient(deck.id)) as [string, string, ...string[]];

    const onSave = () => {
        setSaved(true);
        saveDeck(deck).then(success=>{
            if(!success){
                setSaved(false);
            }
        });
    } 

    const onRemove = () => {
        setSaved(false);
        removeSavedDeck(deck).then(success=>{
            if(!success){
                setSaved(true);
            }
        });
    } 

    return (
        <TouchableOpacity
            onPress={()=>{
                navigation.push('Deck',{
                    deck: deck
                });
            }}
            className="flex w-full max-h-20 gap-5 flex-row items-center justify-between p-2.5 bg-white border border-gray-200 rounded-lg"
        >
            <View className="h-full aspect-square">
                {
                    deck.img?
                    <Image src={deck.img} className="w-full h-full object-cover"/>
                    :
                    <LinearGradient className="w-full h-full" colors={gradient}/>
                }
                
            </View>
            <View className="flex-1">
                <Text className="text-lg font-semibold">{deck.name}</Text>
                <Text className="text-gray-400 italic">{deck.owner}</Text>
            </View>

            <View className="flex flex-row items-center gap-2.5">
                <Pressable onPress={saved ? () => onRemove() : () => onSave()}>
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