import { SafeAreaView, Text, View } from "react-native";
import { ContinuousConfetti } from "react-native-fast-confetti";
import { formatMS } from "shared/utils/common";
import { newSession } from "types";
interface props{
    session: newSession
}

export const ReviewCompletedScreen = ({session}: props) => {
    return(
        <SafeAreaView className="flex-1">
            <ContinuousConfetti/>
            <View className="h-full w-ful flex items-center justify-center gap-2.5">
                <Text className="text-3xl font-bold">Review completed! 👏👏
                </Text>
                <Text className="text-xl">Duration: {formatMS(session.duration)}</Text>
                <Text className="text-xl">Wrong: {session.wrong}</Text>
                <Text className="text-xl">Correct: {session.good}</Text>
                <Text className="text-xl">Perfect: {session.perfect}</Text>

            </View>
        </SafeAreaView>
    );
}