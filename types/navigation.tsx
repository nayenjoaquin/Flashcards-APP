import { NavigatorScreenParams } from "@react-navigation/native";


  export type DecksStackParamList = {
    Decks: undefined;
  };
  
  export type MainTabParamList = {
    Home: undefined;
    Decks: undefined;
    Explore: undefined
    Settings: undefined;
  };

  export type RootStackParamList = {
    Main: undefined;
    Deck: { deck: Deck};
    NewCard: {
      onSubmit: (newCard: NewCard)=>Promise<void>
    }
    Review: {
      cards: Card[],
      deck: Deck,
      progress: DeckProgress
    };
    Login: undefined;
    Register: undefined;
    new_deck: undefined;
  }