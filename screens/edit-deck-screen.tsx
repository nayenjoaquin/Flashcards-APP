import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FilledButton } from "components/buttons/filled-button";
import { LabeledTextField } from "components/inputs/labeled-textfield";
import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native"
import useDecks from "shared/hooks/decks";
import { Deck } from "types";
import { RootStackParamList } from "types/navigation";

type DeckScreenRouteProp = RouteProp<RootStackParamList, "EditDeck">;
type navigationProp = StackNavigationProp<RootStackParamList, "EditDeck">;

export const EditDeckScreen = () =>{

      const route = useRoute<DeckScreenRouteProp>();
      const navigation = useNavigation<navigationProp>();
      const {updateDeck} = useDecks();
      const {deck} = route.params;
      const [updatedDeck, setUpdatedDeck] = useState<Deck>(deck);
      
    return(
        <View className=" w-full h-full p-5">
            <SafeAreaView className="w-full h-full flex-1 items-center justify-center">
                <View className="w-full rounded-xl bg-white flex gap-5 p-5">
                <LabeledTextField
                label="Deck name"
                onChange={(text)=>{
                    setUpdatedDeck(prev=>({
                        ...prev,
                        name: text
                    }));
                }}
                placeholder=""
                value={updatedDeck.name}
                ></LabeledTextField>
                <LabeledTextField
                label="Description"
                onChange={(text)=>{setUpdatedDeck(prev=>({
                        ...prev,
                        description: text
                    }));}}
                placeholder=""
                value={updatedDeck.description}
                ></LabeledTextField>
                <FilledButton
                onPress={()=>{
                    updateDeck(updatedDeck).then(success=>{
                        if(!success){
                            console.error('Failed to update Deck');
                            return;
                        }
                        navigation.goBack();
                    })
                }}
                text="Save changes"
                ></FilledButton>
                </View>
            </SafeAreaView>
        </View>
    )
}