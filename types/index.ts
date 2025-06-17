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
    owner: string;
    created_at: Date;
}

type NewDeck = Omit<Deck, 'id'|'saved'>

type progress = {
    n: number;
    i: number;
    ef: number;
    dueDate: number;
}

type Session = {
    deckId: string;
    wrong: number;
    good: number;
    perfect: number;
    reviewedOn: number;
}

type DeckProgress = {
    progress: Record<string, progress>
    lastReviewed?: Date;
}
type User = {
    id: string;
    created_at: Date;
    updated_at: Date;
    username: string;
    email: string;
    password: string;
}