import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { FilledButton } from "components/filled-button";
import { LabeledTextField } from "components/labeled-textfield";
import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { RootStackParamList } from "types/navigation"


type routeProp = RouteProp<RootStackParamList, 'NewCard'>
export const NewCardScreen = () => {

    const route = useRoute<routeProp>();
    const {onSubmit} = route.params;

    const [card, setCard] = useState<NewCard>({
        front: '',
        back: ''
    })
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
                onPress={()=>{
                    onSubmit(card);
                    setCard({
                        front: '',
                        back: ''
                    })
                }}
                text="Add card"/>
            </View>
        </SafeAreaView>
    )
}