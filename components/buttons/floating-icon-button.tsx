import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface props {
    icon: IoniconName;
    onPress: ()=>void;
    color: string;
}

export const FloatingIconButton= ({icon, color, onPress}: props)=>{
    return(
        <TouchableOpacity 
        onPress={onPress}
        style={{
            backgroundColor: color,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 5,
        }}
        className="absolute bottom-5 right-5  z-10 p-2.5 aspect-square rounded-xl"
        >
            <Ionicons name={icon} size={48} color={'white'}/>
        </TouchableOpacity>
    )
}