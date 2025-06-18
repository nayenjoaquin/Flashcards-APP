import { Text, View } from "react-native"
import { DeckProgressBoard } from "./deck-progress-board"
import { FilledButton } from "components/buttons/filled-button"
import { cardsForReview, DEFAULT_PROGRESS } from "shared/utils/spaced-repetition"
import { progressStore } from "shared/stores/progress"
import { Card } from "types"

interface props {
    onReview: ()=>void;
    cards: Card[];
}

export const DeckViewHeader = ({onReview, cards}: props) =>{

    const {progress} = progressStore();
    return(
        <View className="flex items-start w-full bg-white p-5 py-10 rounded-xl">
            <Text className="text-5xl font-semibold w-full text-center">{cardsForReview(progress.progress, cards).length}</Text>
            <Text className="text-md font-semibold w-full text-center">cards for review</Text>
            <DeckProgressBoard progress={progress.progress} cards={cards}/>
            <View className="py-5 w-full">
                <FilledButton text="Review now" onPress={onReview} />
            </View>
        </View>
    )
}