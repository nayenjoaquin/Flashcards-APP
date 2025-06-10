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
type User = {
    id: string;
    created_at: Date;
    updated_at: Date;
    username: string;
    email: string;
    password: string;
}