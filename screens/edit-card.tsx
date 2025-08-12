import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FilledButton } from "components/buttons/filled-button";
import { LabeledTextField } from "components/inputs/labeled-textfield";
import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import useDecks from "shared/hooks/decks";
import useCards from "shared/hooks/flashcards";
import { Card, NewCard } from "types";
import { RootStackParamList } from "types/navigation";

type routeProp = RouteProp<RootStackParamList, "EditCard">;
type navigationProp = StackNavigationProp<RootStackParamList, "EditCard">;

export const EditCardScreen = () => {

    const navigation = useNavigation<navigationProp>();
    const router = useRoute<routeProp>();
    const {card} = router.params

    const [editedCard, setEditedCard] = useState<Card>(card)
    const {updateCard} = useCards();

    const onSubmit = async () => {
        if(!editedCard.front || !editedCard.back){
            console.error('Fields cannot be empty, please try again.');
            return;
        }
        updateCard(editedCard).then(success=>{
            if(!success){
                console.error('Failed to update card, please try again later');
                return;
            }
            navigation.goBack();
        })
    }
    return(
        <SafeAreaView className="">
            <View className=" w-full h-full flex justify-start items-center gap-5 p-5">
                <LabeledTextField
                onChange={text=>{
                    setEditedCard(prev=>({
                        ...prev,
                        front: text
                    }))
                }}
                label="Front:"
                placeholder="Type here..."
                value={editedCard.front}
                ></LabeledTextField>
                <LabeledTextField
                onChange={text=>{
                    setEditedCard(prev=>({
                        ...prev,
                        back: text
                    }))
                }}
                label="Back:"
                placeholder="Type here..."
                value={editedCard.back}
                ></LabeledTextField>
                <FilledButton
                onPress={onSubmit}
                text="Save changes"/>
            </View>
        </SafeAreaView>
    )
}