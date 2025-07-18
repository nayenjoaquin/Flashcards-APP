import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DeckCard } from "components/layout/deck-card";
import { NewDeckModal } from "components/layout/new-deck-modal";
import useDecks from "shared/hooks/decks";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Deck } from "types";
import { DecksStackParamList, RootStackParamList} from "types/navigation";
import { filter, FilterBar } from "components/layout/filter-bar";
import { useAuth } from "shared/hooks/auth";



type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Deck'>;

export const LibraryScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [newDeck, setNewDeck] = useState(false);
    const {user} = useAuth()
    const [filteredDecks, setFilteredDecks] = useState<Deck[]>([]);

    const {savedDecks, loading, error, createDeck, fetchDecks, setDecks} = useDecks();

    const filters: filter[] = [
        {
            name: 'My decks',
            onApply: ()=>setFilteredDecks(savedDecks.filter(deck=>deck.user_id==user?.id)),
            onRemove: ()=>setFilteredDecks(savedDecks)
        }
    ]

    useEffect(() => {
    fetchDecks();
    }, []);
    useEffect(()=>{
        setFilteredDecks(savedDecks);
    }, [savedDecks])

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
        <View className="w-full p-5 gap-5 flex flex-col bg-neutral-100">
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
                    }}
                    onSubmit={createDeck}/>
                    
                </View>
                :
                null
            }
            <FilterBar filters={filters}/>
            {
                loading ?
                <View className="h-full flex w-full items-center justify-center"><ActivityIndicator size="large"/></View>
                :
                error ?
                <Text className="text-3xl font-bold">{error}</Text>
                : <ScrollView >
                    <View className="flex flex-row flex-wrap justify-start">
                        {filteredDecks?.map((deck: Deck, index: number)=>{
                        return <DeckCard onPressed={()=>{
                            navigation.push('Deck',{
                                deck: deck
                            })
                        }} deck={deck} key={deck.id} index={index}/>
                        })}
                    </View>
                </ScrollView>
            }
        </View>
    )
}