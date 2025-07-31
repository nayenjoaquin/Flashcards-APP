import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { FilledButton } from "components/buttons/filled-button";
import { LabeledTextField } from "components/inputs/labeled-textfield";
import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import useDecks from "shared/hooks/decks";
import useCards from "shared/hooks/flashcards";
import { NewCard } from "types";
import { RootStackParamList } from "types/navigation"


export const NewCardScreen = () => {

    const DEFAULT_CARD_STATE: NewCard ={
        front: '',
        back: ''
    } 

    const [card, setCard] = useState<NewCard>(DEFAULT_CARD_STATE)

    const {currentDeck} = useDecks();
    const {createCard} = useCards();

    const onSubmit = async () => {
        if(!card.front || !card.back){
            console.error('Fields cannot be empty, please try again.');
            return;
        }
        

        const newCard = await createCard(card, currentDeck!.id)
        if(newCard){
            setCard(DEFAULT_CARD_STATE);
        }
    }
    return(
        <SafeAreaView className="">
            <View className=" w-full h-full flex justify-start items-center gap-5 p-5">
                <LabeledTextField
                onChange={text=>{
                    setCard(prev=>({
                        ...prev,
                        front: text
                    }))
                }}
                label="Front:"
                placeholder="Type here..."
                value={card.front}
                ></LabeledTextField>
                <LabeledTextField
                onChange={text=>{
                    setCard(prev=>({
                        ...prev,
                        back: text
                    }))
                }}
                label="Back:"
                placeholder="Type here..."
                value={card.back}
                ></LabeledTextField>
                <FilledButton
                onPress={onSubmit}
                text="Add card"/>
            </View>
        </SafeAreaView>
    )
}