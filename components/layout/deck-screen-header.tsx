import { Text, View } from "react-native"
import { DeckProgressBoard } from "./deck-progress-board"
import { FilledButton } from "components/buttons/filled-button"
import { cardsForReview } from "shared/utils/spaced-repetition"
import { progressStore } from "shared/stores/progress"
import { Card, Deck } from "types"

interface props {
    onReview: ()=>void;
    deck: Deck;
}

export const DeckViewHeader = ({onReview, deck}: props) =>{
    return(
        <View className="flex items-start w-full bg-white p-5 py-10 rounded-xl">
            <Text className="text-5xl font-semibold w-full text-center">{cardsForReview(deck.cards, deck.progress).length}</Text>
            <Text className="text-md font-semibold w-full text-center">cards for review</Text>
            <DeckProgressBoard progress={deck.progress} cards={deck.cards}/>
            <View className="py-5 w-full">
                <FilledButton text="Review now" onPress={onReview} />
            </View>
        </View>
    )
}