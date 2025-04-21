import { NavigatorScreenParams } from "@react-navigation/native";


  export type DecksStackParamList = {
    Decks: undefined;
    Deck: { deck: Deck };
  };
  
  export type RootTabParamList = {
    Home: undefined;
    DecksStack: NavigatorScreenParams<DecksStackParamList>;
  };