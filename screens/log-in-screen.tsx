import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FilledButton } from "components/filled-button";
import { LabeledCheckBox } from "components/labeled-checkbox";
import { LabeledTextField } from "components/labeled-textfield";
import { useAuth } from "hooks/auth";
import { useState } from "react"
import { SafeAreaView, Text, View } from "react-native"
import { RootStackParamList } from "types/navigation";

type navProps = NativeStackNavigationProp<RootStackParamList,'Login'>

export const LogInScreen = () => {
    const [fields, setFields] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const navigation = useNavigation<navProps>();

    const {user, signIn} = useAuth();
    return(
        <View className="p-5">
            <SafeAreaView className=" flex w-full h-full items-center justify-center">
                <View className="w-full flex items-center gap-2.5 p-5 rounded-xl bg-white">
                    <Text className="text-2xl font-medium mb-5">
                        Welcome back!
                    </Text>
                    <LabeledTextField
                    label="email"
                    onChange={(text)=>setFields(prev=>({
                        ...prev,
                        email: text
                    }))}
                    placeholder="email"
                    value={fields.email}
                    />
                    <LabeledTextField
                    label="password"
                    onChange={(text)=>setFields(prev=>({
                        ...prev,
                        password: text
                    }))}
                    placeholder="password"
                    secret
                    value={fields.password}
                    />
                    <FilledButton
                    text="Sign In"
                    onPress={async ()=>{
                        signIn(fields.email, fields.password, fields.remember)
                        .then((user)=>{
                            if(user){
                                navigation.push('Main');
                            }
                        })
                    }}/>

                    <LabeledCheckBox
                    label="remember me?"
                    onChange={(value)=>{
                        setFields(prev=>({
                            ...prev,
                            remember: value
                        }));
                    }} />
                </View>
            </SafeAreaView>
        </View>
    )
}