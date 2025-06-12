import { SettingsUserPreview } from "components/layout/settings-user-preview"
import { SafeAreaView, View } from "react-native"

export const SettingsScreen = () => {
    return(
        <View className="p-5">
            <SafeAreaView className=" flex w-full h-full justify-center items-center">
                <SettingsUserPreview/>
            </SafeAreaView>
        </View>
    )
}
