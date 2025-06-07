type Card = {
    id: string;
    front: string;
    back: string;
}

type NewCard = Omit<Card, 'id'>

type Deck={
    id: string;
    name: string;
    description: string;
    saved: number;
    visibility: string;
}

type NewDeck = Omit<Deck, 'id'|'saved'>

type progress = {
    n: number;
    i: number;
    ef: number;
    dueDate: Date;
}

type DeckProgress = {
    
}