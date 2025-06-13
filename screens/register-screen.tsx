import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FilledButton } from "components/buttons/filled-button";
import { LabeledCheckBox } from "components/inputs/labeled-checkbox";
import { LabeledTextField } from "components/inputs/labeled-textfield";
import { useAuth } from "hooks/auth";
import { useState } from "react"
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { RootStackParamList } from "types/navigation";

type navProps = NativeStackNavigationProp<RootStackParamList,'Register'>

export const RegisterScreen = () => {
    const [fields, setFields] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirmation: ''
    });

    const navigation = useNavigation<navProps>();

    const {signUp} = useAuth();
    
    return(
        <View className="p-5">
            <SafeAreaView className=" flex w-full h-full items-center justify-center">
                <View className="w-full flex items-center gap-5 p-5 rounded-xl bg-white">
                    <Text className="text-2xl font-medium mb-5">
                        Create an account
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
                    label="username"
                    onChange={(text)=>setFields(prev=>({
                        ...prev,
                        username: text
                    }))}
                    placeholder="username"
                    value={fields.username}
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
                    <LabeledTextField
                    label="Confirm password"
                    onChange={(text)=>setFields(prev=>({
                        ...prev,
                        passwordConfirmation: text
                    }))}
                    placeholder="password"
                    secret
                    value={fields.passwordConfirmation}
                    />
                    <FilledButton
                    text="Sign Up"
                    onPress={async ()=>{
                        if(fields.password!=fields.passwordConfirmation){
                            console.error("Passwords don't match");
                            return;
                        }
                        signUp(fields.email, fields.password, fields.username)
                        .then((user)=>{
                            if(user){
                                navigation.push('Main');
                            }else{
                                setFields({
                                    email: '',
                                    password:'',
                                    username: '',
                                    passwordConfirmation: ''
                                })
                            }
                        })
                    }}/>w
                    <View className="flxe flex-row">
                        <Text>Have an account already?</Text>
                        <TouchableOpacity onPress={()=>{
                            navigation.goBack();
                        }}>
                            <Text className="text-primary-500 font-semibold"> Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}