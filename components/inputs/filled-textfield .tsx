import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface props {
    onChange: (text: string)=>void;
    value: string;
    placeholder: string;
    secret?: boolean;
}

export const FilledTextField = ({onChange, placeholder, value, secret}: props) => {

    const [obscure, setObscure] = useState(secret);
    return(
        <View className=" w-fullflex flex-row items-center gap-2.5">
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
                    <Ionicons className="absolute right-5" name={obscure ? 'eye-off':'eye'} size={32}/>
                </TouchableOpacity>
                : null}
        </View>
    )
}