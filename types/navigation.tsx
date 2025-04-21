import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
    Home: undefined;
    deck: { did: string;};
    decks: undefined;
  };
  export type DecksStackParamList = {
    Decks: undefined;
    Deck: { did: string };
  };
  
  export type RootTabParamList = {
    Home: undefined;
    DecksStack: NavigatorScreenParams<DecksStackParamList>;
  };