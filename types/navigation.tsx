import { NavigatorScreenParams } from "@react-navigation/native";


  export type DecksStackParamList = {
    Decks: undefined;
  };
  
  export type MainTabParamList = {
    Home: undefined;
    Decks: undefined;
  };

  export type RootStackParamList = {
    Main: undefined;
    Deck: { deck: Deck,
      onDelete: (id: string)=>Promise<void>
     };
    NewCard: {
      onSubmit: (newCard: NewCard)=>Promise<void>
    }
    Review: {
      cards: Card[],
      deckName: string
    };
    new_deck: undefined;
  }