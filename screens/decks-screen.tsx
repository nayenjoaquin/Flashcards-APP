import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DeckCard } from "components/deck-card";
import { NewDeckModal } from "components/new-deck-modal";
import useDecks from "hooks/decks";
import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { DecksStackParamList, RootStackParamList} from "types/navigation";



type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Deck'>;

export const DecksScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [newDeck, setNewDeck] = useState(false);

    const {decks, loading, error} = useDecks();
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>(
                <TouchableOpacity onPress={()=>{
                    setNewDeck(true);
                }}>
                    <Ionicons name="add" size={32} />
                </TouchableOpacity>
            )
        })
    })


    return(
        <View className="w-full flex flex-col bg-neutral-100">
            {
                newDeck?
                <View className=" z-10 h-full w-full absolute flex justify-end">
                    <Pressable
                    className='absolute h-screen w-full bg-black opacity-20 flex justify-center'
                    onPress={()=>setNewDeck(false)}>
                    </Pressable>
                    <NewDeckModal
                    onClose={()=>{
                        setNewDeck(false)
                    }}/>
                </View>
                :
                null
            }
            {
                loading ?
                <View className="h-full flex w-full items-center justify-center"><ActivityIndicator size="large"/></View>
                :
                error ?
                <Text className="text-3xl font-bold">{error}</Text>
                : <ScrollView >
                    <View className="flex flex-row flex-wrap justify-center">
                        {decks.map((deck: Deck, index: number)=>{
                        return <DeckCard deck={deck} key={deck.id} index={index}/>
                        })}
                    </View>
                </ScrollView>
            }
        </View>
    )
}