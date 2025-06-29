import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FilledButton } from "components/buttons/filled-button";
import { useAuth } from "shared/hooks/auth";
import { Text, View } from "react-native"
import { RootStackParamList } from "types/navigation";
import appTheme from "../../shared/const/app-theme";
import { useNavigation } from "@react-navigation/native";
import { UserAvatar } from "./user-avatar";

type navProp = NativeStackNavigationProp<RootStackParamList>

export const SettingsUserPreview = () => {

    const {user, signOut} = useAuth();
    const navigation = useNavigation<navProp>();
    return(
        <View className="flex items-center gap-2.5 w-full bg-white rounded-2xl p-5">
            <UserAvatar user={user!} size={'40px'}/>
            <Text className="text-xl">{user?.username}</Text>
            <Text className="text-gray-400">{user?.email}</Text>
            <FilledButton
            onPress={async()=>{
                await signOut();
                navigation.reset({
                    index: 0,
                    routes:[{name:'Login'}]
                });
            }}
            text="Sign out"
            color={appTheme.secondary[500]}
            />
        </View>
    )
}