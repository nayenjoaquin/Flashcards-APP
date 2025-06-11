import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface props {
    onChange: (text: string)=>void;
    value: string;
    placeholder: string;
    label: string
    secret?: boolean;
}

export const LabeledTextField = ({onChange, placeholder, value, label, secret}: props) => {

    const [obscure, setObscure] = useState(secret);
    return(
        <View className="w-full flex gap-2.5">
            <Text className="text-sm text-gray-700 font-semibold">{label}</Text>
            <View className="flex flex-row items-center gap-2.5">
                <TextInput
                    secureTextEntry={obscure}
                    autoCapitalize="none"
                    onChangeText={onChange}
                    className="bg-white p-5 rounded-xl text-xl w-full placeholder:text-gray-300 border border-gray-300"
                    placeholder={placeholder}
                    value={value}
                />
                {secret ?
                    <TouchableOpacity className="flex justify-center items-center" onPress={()=>{
                        setObscure(prev=>!prev);
                    }}>
                        <Ionicons className="absolute right-5" name={obscure ? 'eye':'eye-off'} size={32}/>
                    </TouchableOpacity>
                    : null}
                </View>

        </View>
    )
}