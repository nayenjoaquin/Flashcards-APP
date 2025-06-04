import { useState } from "react"
import { SafeAreaView, TextBase, TextInput } from "react-native"

type NewDeck = {
    name: string;
    description: string;
    visibility: string;
}

const DEFAULT_DECK={
        name: 'New Deck',
        description:'',
        visibility: 'private'
}

export const NewDeckScreen = () => {

    const [newDeck, setNewDeck] = useState<NewDeck>(DEFAULT_DECK)
    return(
        <SafeAreaView className=" h-full flex justify-center">
            <TextInput
            className="bg-white p-2.5 text-2xl"
            placeholder="Type here..."
            value={newDeck.name}
            onChangeText={(text)=>setNewDeck({
                ...newDeck,
                name: text
            })}/>

        </SafeAreaView>
    )
}