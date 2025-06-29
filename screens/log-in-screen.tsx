import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FilledButton } from "components/buttons/filled-button";
import { LabeledCheckBox } from "components/inputs/labeled-checkbox";
import { LabeledTextField } from "components/inputs/labeled-textfield";
import { useAuth } from "shared/hooks/auth";
import { useState } from "react"
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { RootStackParamList } from "types/navigation";

type navProps = NativeStackNavigationProp<RootStackParamList,'Login'>

export const LogInScreen = () => {
    const [fields, setFields] = useState({
        email: '',
        password: '',
    });

    const navigation = useNavigation<navProps>();

    const {signIn} = useAuth();
    
    return(
        <View className="p-5">
            <SafeAreaView className=" flex w-full h-full items-center justify-center">
                <View className="w-full flex items-center gap-5 p-5 rounded-xl bg-white">
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
                        signIn(fields.email, fields.password)
                        .then((user)=>{
                            if(user){
                                navigation.push('Main');
                            }else{
                                setFields({
                                    email: '',
                                    password:'',
                                })
                            }
                        })
                    }}/>w
                    <View className="flxe flex-row">
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={()=>{
                            navigation.push('Register');
                        }}>
                            <Text className="text-primary-500 font-semibold"> Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}