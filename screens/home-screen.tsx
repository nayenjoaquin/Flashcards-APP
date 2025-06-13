import { SafeAreaView, ScrollView, Text, View } from "react-native"

export const HomeScreen = () => {
    return(
        <View className="p-5">
            <SafeAreaView className="flex w-full h-full items-center justify-center gap-5">
                <View className="flex w-full justify-center items-start gap-2.5">
                    <Text className="text-2xl font-semibold">Last reviewed</Text>
                    <ScrollView horizontal className="bg-red-500 w-full h-40">
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}