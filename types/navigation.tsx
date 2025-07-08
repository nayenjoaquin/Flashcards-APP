import { NavigatorScreenParams } from "@react-navigation/native";
import { Card, Deck, DeckProgress, NewCard, Progress } from "types";


  export type DecksStackParamList = {
    Decks: undefined;
  };
  
  export type MainTabParamList = {
    Home: undefined;
    Library: undefined;
    Explore: undefined
    Profile: undefined;
  };

  export type RootStackParamList = {
    Main: undefined;
    Deck: { deck: Deck};
    NewCard: {
      onSubmit: (newCard: NewCard)=>Promise<boolean>
    }
    Review: {
      cards: Card[],
      deck: Deck,
    };
    Login: undefined;
    Register: undefined;
    new_deck: undefined;
  }