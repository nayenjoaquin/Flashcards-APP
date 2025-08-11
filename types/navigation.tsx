import { NavigatorScreenParams } from "@react-navigation/native";
import { Card, Deck, NewCard } from "types";


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
    EditDeck: {deck: Deck};
    NewCard: undefined;
    Review: {
      cards: Card[],
      deck: Deck,
      onReviewFinished: (deck: Deck) => void
    };
    Login: undefined;
    Register: undefined;
    new_deck: undefined;
  }